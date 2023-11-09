import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AtendimentoService } from '../../atendimento.service';
import { TiposPagamentoService } from 'src/app/components/gestao/pages/tipos-pagamento/tipos-pagamento.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss'],
})
export class PagamentoComponent implements OnInit {
  constructor(
    private atendimentoService: AtendimentoService,
    private tiposPagamentoService: TiposPagamentoService
  ) {}

  buttonLoading: boolean = false;
  formasDePagamento: any;
  selectedPagamentos: any;
  servicos: any;
  precoFinal: any;
  desconto: any;
  precoOriginal: any;
  desabilitarBotao: any;
  tipoDesconto: string = "";
  isMoney:boolean = false;
  isPercent:boolean = false;
  vl_desconto_p:any;
  valoresDosPagamentos: { [cd_pagamento: number]: number } = {};

  tipos_pregunta = [
    {
      label: "Desconto em R$",
      value: 1
    },
    {
      label: "Desconto em %",
      value: 2
    },
  ]

  @Input() chamarModalPagamento: boolean = false;
  @Output() dialogClosed = new EventEmitter<void>();

  pagamentoForm = new FormGroup({
    perc_desc_p: new FormControl(''),
    vl_desconto_p: new FormControl(''),
    pagamentos: new FormControl(''),
    pregunta: new FormControl(''),
    tipo_de_pregunta: new FormControl(null),
    pagamento: new FormControl("")
  });

    
  createForm(){
    this.pagamentoForm?.valueChanges.subscribe((e:any) => {
      this.pagamentoForm?.setValue(e, { emitEvent: false });
    });
  }

  pagamento() {
    const formValue = this.pagamentoForm.value;

    const arrayDePagamentos = [];

    for (const pagamento of this.selectedPagamentos) {
      const cd_tipo_pagamento = pagamento.cd_pagamento;
      const valor = this.valoresDosPagamentos[cd_tipo_pagamento] || 0;

      arrayDePagamentos.push({ cd_tipo_pagamento, valor });
    }

    const bodyPagamento = {
      nr_atendimento_p: 2,
      vl_desconto_p: 0,
      cd_usuario_p: 1,
      perc_desc_p: 0,
      dh_vencimento_p: "2023-10-15 17:33:36",
      pagamentos: arrayDePagamentos
    }

    console.log('body', bodyPagamento)

  }

  getTipoPagamento() {
    this.tiposPagamentoService.getTiposPagamento().subscribe({
      next: (res: any) => {
        const { data } = res;
        const pagamentoConcatenado = data.map((pagamento: any) => ({
          ...pagamento,
          pagamentoEparcelas: `${pagamento.descricao} - ${pagamento.qtd_parcelas > 1 ? 'Até' : ''} ${pagamento.qtd_parcelas}x ${pagamento.qtd_parcelas == 1 ? '(Pagamento a vista)' : 'Parcelas'}`,
        }));

        this.formasDePagamento = pagamentoConcatenado;
      },
    });
  }

  getPagamentoByClient(servicos: any) {
    const { nr_atendimento, valor_total } = servicos;

    this.precoFinal = valor_total;
    this.precoOriginal = valor_total;
    this.atendimentoService.getServicosEmAndamento(nr_atendimento).subscribe({
      next: (res: any) => {
        const { data } = res;
        this.servicos = data;
      },
    });
  }

  calcularPrecoComDesconto(event: Event) {
    const novoDesconto = Number(event);

    this.desabilitarBotao = false;

    if (!isNaN(novoDesconto)) {
      this.desconto = novoDesconto;
    }

    if (event == null) {
      this.desconto = 0
    }

    if (novoDesconto > this.precoFinal) {
      this.desabilitarBotao = true;
    }
    this.precoFinal = this.precoOriginal - this.desconto;
  }

  calcularDescontoPercentual(event: Event) {
    const novoDesconto = Number(event);

    if (!isNaN(novoDesconto)) {
      this.desconto = novoDesconto;

      const valorPercentual = (this.desconto / 100) * this.precoOriginal;

      this.precoFinal = this.precoOriginal - valorPercentual;
    }

    if (event == null) {
      this.desconto = 0
    }

  }

  tipoDescontoRadio(event: any){
    const a = Object(event)

    if(a.value == 1 ){  
      this.pagamentoForm.get('perc_desc_p')?.setValue('');
      this.isMoney = true
      this.isPercent = false
    }

    if(a.value == 2){
      this.pagamentoForm.get('vl_desconto_p')?.setValue('');
      this.isMoney = false
      this.isPercent = true
    }
    
  }

  onMultiSelectChangePagamento(pagamento: any) {
    this.selectedPagamentos = pagamento.value;
  }

  ngOnInit(): void {
    this.getTipoPagamento();
  }

  closeDialog() {
    this.dialogClosed.emit();
    this.pagamentoForm.reset();
    // this.formasDePagamento = {}
    this.selectedPagamentos = []
    this.isMoney = false;
    this.isPercent = false
  }
}

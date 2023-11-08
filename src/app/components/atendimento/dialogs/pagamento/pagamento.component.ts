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

  @Input() chamarModalPagamento: boolean = false;
  @Output() dialogClosed = new EventEmitter<void>();

  pagamentoForm = new FormGroup({
    perc_desc_p: new FormControl(''),
    vl_desconto_p: new FormControl(''),
    pagamentos: new FormControl(''),
  });

  pagamento() {
    // this.atendimentoService.postPagamento()
  }

  getTipoPagamento() {
    this.tiposPagamentoService.getTiposPagamento().subscribe({
      next: (res: any) => {
        const { data } = res;
        const pagamentoConcatenado = data.map((pagamento: any) => ({
          ...pagamento,
          pagamentoEparcelas: `${pagamento.descricao} - ${
            pagamento.qtd_parcelas > 1 ? 'Até' : ''
          } ${pagamento.qtd_parcelas}x ${
            pagamento.qtd_parcelas == 1 ? '(Pagamento a vista)' : 'Parcelas'
          }`,
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
    if (event == null) {
      return;
    }

    this.desabilitarBotao = false;

    if (!isNaN(novoDesconto)) {
      this.desconto = novoDesconto;
    }

    if (novoDesconto > this.precoFinal) {
      this.desabilitarBotao = true;
    }
    this.precoFinal = this.precoOriginal - this.desconto;
  }

  calcularDescontoPercentual(event: Event) {
    const novoDesconto = Number(event);

    if (event == null) {
      return;
    }

    if (!isNaN(novoDesconto)) {
      this.desconto = novoDesconto;

      const valorPercentual = (this.desconto / 100) * this.precoFinal;
      console.log('valorPercentual', valorPercentual);

      this.precoFinal = this.precoOriginal - valorPercentual;
      console.log('this.precoFinal', this.precoFinal);
    } else {
      console.log('Valor de desconto inválido');
    }
  }

  // atualizarPrecoFinal(result:any){
  //   console.log('res', result)
  //   console.log('preco',Number(this.precoFinal))
  // }

  onMultiSelectChangePagamento(pagamento: any) {
    this.selectedPagamentos = pagamento.value;
  }

  ngOnInit(): void {
    this.getTipoPagamento();
  }

  closeDialog() {
    this.dialogClosed.emit();
  }
}

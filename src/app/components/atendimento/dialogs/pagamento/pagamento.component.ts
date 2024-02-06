import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AtendimentoService } from '../../atendimento.service';
import { TiposPagamentoService } from 'src/app/components/gestao/pages/tipos-pagamento/tipos-pagamento.service';
import { format } from 'date-fns';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss'],
  providers:[MessageService]
  
})
export class PagamentoComponent implements OnInit {
  constructor(
    private atendimentoService: AtendimentoService,
    private tiposPagamentoService: TiposPagamentoService,
    private messageService: MessageService
  ) {}

  buttonLoading: boolean = false;
  formasDePagamento: any;
  selectedPagamentos: any;
  servicos: any;
  precoFinal: number = 0;
  desconto: number = 0;
  precoOriginal: number = 0;
  desabilitarBotao: boolean = false;
  tipoDesconto: string = "";
  isMoney:boolean = false;
  isPercent:boolean = false;
  vl_desconto_p:number = 0;
  valoresDosPagamentos: { [cd_pagamento: number]: number } = {};
  troco:number = 0
  valorDigitado:number = 0
  valorSomatoria:number = 0
  arraySelecionados:any
  servicosFinalizados:any
  valorPago: number = 0;


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
  @Output() getAtendimentos = new EventEmitter<void>();

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

  verificaStatusServicoFinalizado(servico:any){
    this.servicosFinalizados = servico.every((item:any) => item.status_servico === 'F')
    return this.servicosFinalizados;
  } 


  pagamento() {
    const servicos = this.servicos
    const dataAtual = new Date();
    const formatoDesejado = 'yyyy-MM-dd HH:mm:ss';
    const nr_atendimento = servicos[0].nr_atendimento
    const arrayDePagamentos = [];

    //BODY
    const formValue = this.pagamentoForm.value;
    const vl_desconto_p = formValue.vl_desconto_p;
    const perc_desc_p = formValue.perc_desc_p;
    const dataFormatada = format(dataAtual, formatoDesejado);
    const cd_usuario_p = localStorage.getItem("cd_usuario")


    for (const pagamento of this.selectedPagamentos) {
      const cd_tipo_pagamento = pagamento.cd_pagamento;
      const valor = this.valoresDosPagamentos[cd_tipo_pagamento] || 0;

      arrayDePagamentos.push({ cd_tipo_pagamento, valor });
    }

    const bodyPagamento = {
      nr_atendimento_p: nr_atendimento,
      troco_p:this.troco <= 0 || this.troco == null || isNaN(this.troco) ? 0 : this.troco,
      vl_desconto_p: vl_desconto_p == '' || vl_desconto_p == null ? 0: vl_desconto_p,
      cd_usuario_p,
      perc_desc_p: perc_desc_p == '' || perc_desc_p == null ? 0: perc_desc_p,
      dh_vencimento_p: dataFormatada,
      pagamentos: arrayDePagamentos
    }

    this.buttonLoading = true;

    this.atendimentoService.postPagamento(bodyPagamento)
    .subscribe({
      next:(res:any) => {
        this.buttonLoading = false;
        const { message } = res
        this.closeDialog();
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: message,
        });

        const verificaStatus = this.verificaStatusServicoFinalizado(servicos) 

        if(verificaStatus){
          this.atendimentoService.finalizarAtendimento(nr_atendimento)
          .subscribe({
            next:(res:any) => {
            }
          })
        }

        this.getAtendimentos.emit();
      }, error:(res:any) => {
        this.buttonLoading = false;
         const { message } = res.error;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: message,
        });
      }
    })
  }

  getTipoPagamento() {
    this.tiposPagamentoService.getTiposPagamento()
    .subscribe({
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
    const { nr_atendimento, valor_total, valor_pago } = servicos;

    this.valorPago = valor_pago
    this.precoFinal = valor_total;
    this.precoOriginal = valor_total;
    this.atendimentoService.getServicosEmAndamento(nr_atendimento)
    .subscribe({
      next: (res: any) => {
        const { data } = res;
        this.servicos = data;
      },
    });
  }

  exibirValorDigitado(pagamento: any, novoValor:any) {
    const { cd_pagamento } = pagamento
 
    if(novoValor == null || novoValor == undefined){
      novoValor = 0
    }
    
    this.arraySelecionados = this.selectedPagamentos.map((pagamento:any) => {
      if (pagamento.cd_pagamento === cd_pagamento) {
        pagamento.valor = novoValor; 
      }
      return pagamento;
    });

    const somatoriaDoValorTotal = this.arraySelecionados.reduce((total:any, pagamento:any) => total + pagamento.valor, 0);
    const temDinheiro = this.arraySelecionados.some((pagamento:any) => pagamento.cd_pagamento === 2);

    this.valorDigitado = somatoriaDoValorTotal

    if(temDinheiro){  
    
      //VARIOS INPUTS DEBITO, CREDITO e ETC
      if(this.arraySelecionados.length > 1){
       this.valorDigitado = somatoriaDoValorTotal
       const valorDinheiro = this.arraySelecionados.filter((res:any) => res.cd_pagamento == 2)
       const valoresSemDinheiro = this.arraySelecionados.filter((res:any) => res.cd_pagamento !==2);
       const dinheiro = Number(valorDinheiro[0].valor)
   
       let totalSemDinhero = 0;
   
       for (const item of valoresSemDinheiro) {
         totalSemDinhero += item.valor;
       }
   
       const validacao = totalSemDinhero + dinheiro
       if(validacao > this.precoFinal && totalSemDinhero < this.precoFinal){
         const logicaTroco = (totalSemDinhero - this.precoFinal) + dinheiro
   
         this.troco = logicaTroco
       }else{
        this.troco = 0
       }
     
      }

      //SOMENTE INPUT DE DINHEIRO
      if(this.arraySelecionados.length == 1){
        this.valorDigitado = novoValor
        this.troco = novoValor - this.precoFinal

        if(this.valorPago > 0){
          const a = this.precoOriginal - this.valorPago
          const b = this.valorDigitado - a 
          this.troco = b
       }
      }

      if(this.troco < 0 ){
        this.troco = 0
      }
    }
 }

  calcularPrecoComDesconto(event: Event) {
    const novoDesconto = Number(event);
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

    if(this.desconto > 0) {
      this.troco =  this.valorDigitado - this.desconto;   
    }

    if(this.desconto === 0){
      this.trocoParaDesconto();
    }
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

   this.trocoParaDesconto();

  }

  trocoParaDesconto(){
    const temDinheiro = this.arraySelecionados.some((pagamento:any) => pagamento.cd_pagamento === 2);
    if(temDinheiro){  
      if(this.arraySelecionados.length > 1 || this.arraySelecionados.some((res:any) => res.descricao == "Dinheiro")){
        const valorDinheiro = this.arraySelecionados.filter((res:any) => res.cd_pagamento == 2)
        const valoresSemDinheiro = this.arraySelecionados.filter((res:any) => res.cd_pagamento !==2);
        const dinheiro = Number(valorDinheiro[0].valor)
    
        let totalSemDinhero = 0;
    
        for (const item of valoresSemDinheiro) {
          totalSemDinhero += item.valor;
        }
    
        const validacao = totalSemDinhero + dinheiro
    
        if(validacao > this.precoFinal && totalSemDinhero < this.precoFinal){
          const logicaTroco = (totalSemDinhero - this.precoFinal) + dinheiro
    
          this.troco = logicaTroco
        }else{
         this.troco = 0
        }
       }   
    }

  }

  tipoDescontoRadio(event: any){
    const a = Object(event)

    if(a.value == 1){  
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
    if(pagamento){
      this.valorDigitado = pagamento.value.reduce((total:any, pagamento:any) => total + pagamento.valor, 0);
      this.troco = this.valorDigitado - this.precoFinal
      if(this.troco < 0){
        this.troco = 0
      }
    }

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

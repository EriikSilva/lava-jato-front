import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AtendimentoService } from '../../atendimento.service';
import { TiposPagamentoService } from 'src/app/components/gestao/pages/tipos-pagamento/tipos-pagamento.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent implements OnInit{

  constructor(
    private atendimentoService:AtendimentoService,
    private tiposPagamentoService:TiposPagamentoService
  ){}

  buttonLoading:boolean = false
  formasDePagamento:any;
  selectedPagamentos:any;
  servicos:any

  @Input() chamarModalPagamento:boolean = false
  @Output() dialogClosed = new EventEmitter<void>();

  pagamentoForm = new FormGroup({
    perc_desc_p: new FormControl(""),
    vl_desconto_p: new FormControl(""),
    pagamentos:new FormControl("")
  })

  pagamento(){
    // this.atendimentoService.postPagamento()
  } 

  getTipoPagamento(){
    this.tiposPagamentoService.getTiposPagamento()
    .subscribe({
      next:(res:any) => {
        const { data } = res
        const pagamentoConcatenado = data.map((pagamento:any) => ({
          ...pagamento,
          pagamentoEparcelas: `${pagamento.descricao} - ${pagamento.qtd_parcelas > 1 ? 'Até': ''} ${pagamento.qtd_parcelas}x ${pagamento.qtd_parcelas == 1 ? '(Pagamento a vista)': 'Parcelas'}` 
        }))

        this.formasDePagamento = pagamentoConcatenado
      }
    })
  }

  getPagamentoByClient(servicos:any){
    // this.atendimentoService
    const { nr_atendimento } = servicos
    this.atendimentoService.getServicosEmAndamento(nr_atendimento)
    .subscribe({
      next:(res:any) => {
        const { data } = res
        this.servicos = data
        console.log('res', res)
      }
    })

    console.log('servicos', servicos)
  }

  onMultiSelectChangePagamento(pagamento:any){
    this.selectedPagamentos = pagamento.value;
  }

  ngOnInit(): void {
    this.getTipoPagamento();
  }


  closeDialog(){
    this.dialogClosed.emit();
  }
}

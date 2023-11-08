import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AtendimentoService } from '../../atendimento.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent {

  constructor(
    private atendimentoService:AtendimentoService
  ){}

  @Input() chamarModalPagamento:boolean = false

  @Output() dialogClosed = new EventEmitter<void>();
  buttonLoading:boolean = false


  pagamentoForm = new FormGroup({
    perc_desc_p: new FormControl(""),
    vl_desconto_p: new FormControl("")
  })

  pagamento(){
    // this.atendimentoService.postPagamento()
  }

  closeDialog(){
    this.dialogClosed.emit();
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent {

  @Input() chamarModalPagamento:boolean = false

  @Output() dialogClosed = new EventEmitter<void>();


  closeDialog(){
    this.dialogClosed.emit();
  }

}

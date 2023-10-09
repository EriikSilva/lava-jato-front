import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-finalizar-atendimento',
  templateUrl: './finalizar-atendimento.component.html',
  styleUrls: ['./finalizar-atendimento.component.scss']
})
export class FinalizarAtendimentoComponent {

  @Input() finalizarAtendimentoDialog:boolean = false
  @Output() dialogClosed = new EventEmitter<void>();




  closeDialog(){
    this.finalizarAtendimentoDialog = false
    this.dialogClosed.emit();
  }

}

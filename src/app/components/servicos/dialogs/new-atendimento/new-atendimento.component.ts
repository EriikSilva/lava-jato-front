import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-new-atendimento',
  templateUrl: './new-atendimento.component.html',
  styleUrls: ['./new-atendimento.component.scss']
})
export class NewAtendimentoComponent {

  @Input() atendimentoDialog:boolean = false

  @Output() dialogClosed = new EventEmitter<void>();



  closeDialog(){
    this.atendimentoDialog = false
  }
  
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-visualizar-servico',
  templateUrl: './visualizar-servico.component.html',
  styleUrls: ['./visualizar-servico.component.scss']
})
export class VisualizarServicoComponent {

  @Input() visualizarServicoDialog:boolean = false
  @Output() dialogClosed = new EventEmitter<void>();

  closeDialog(){
    this.visualizarServicoDialog = false
    this.dialogClosed.emit();
  }

}

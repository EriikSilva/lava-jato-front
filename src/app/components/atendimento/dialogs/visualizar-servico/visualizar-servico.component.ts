import { AtendimentoService } from './../../atendimento.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-visualizar-servico',
  templateUrl: './visualizar-servico.component.html',
  styleUrls: ['./visualizar-servico.component.scss']
})
export class VisualizarServicoComponent {

  constructor(
    private atendimentoService:AtendimentoService
  ){}

  @Input() visualizarServicoDialog:boolean = false
  @Output() dialogClosed = new EventEmitter<void>();


  getServicosByClient(cd_cliente:string){
    this.atendimentoService.getAtendimentosAgendamento(cd_cliente)
    .subscribe({
      next:(res:any) => {
        console.log('res', res)
      }
    })
  }

  closeDialog(){
    this.visualizarServicoDialog = false
    this.dialogClosed.emit();
  }

}

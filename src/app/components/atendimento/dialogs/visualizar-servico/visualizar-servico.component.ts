import { AtendimentoService } from './../../atendimento.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { json_servico } from './json-servico-cliente';
import { JSONServico } from '../../DTO/atendimentoDTO';

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
  selectAll: boolean = false;
  selectedItems:any




  servicoCliente:any;
  a:any

  getServicosByClient(cd_cliente:string){
    this.atendimentoService.getAtendimentosAgendamento(cd_cliente)
    .subscribe({
      next:(res:any) => {
        const { data } = res
        // this.servicoCliente = data
        console.log('data', data)

        const response = json_servico(data)
        console.log('res' ,response)
        this.servicoCliente = response
      }
    })
  }

  closeDialog(){
    this.visualizarServicoDialog = false
    this.dialogClosed.emit();
  }

}

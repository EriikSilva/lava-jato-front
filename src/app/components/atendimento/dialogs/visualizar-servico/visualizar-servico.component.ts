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
        const response = json_servico(data)
        this.servicoCliente = response
      }
    })
  }

  finalizarServico(){
    const nr_servicos = this.selectedItems.map((item:any) => item.nr_servico);
    const nr_servicos_string = nr_servicos.map((nr_servico:any) => nr_servico.toString());
    const nr_atendimento = this.selectedItems[0].nr_atendimento


    const bodyFinalizarServico = {
      nr_atendimento_p:nr_atendimento,
      nr_servico_p: nr_servicos_string
    }

    console.log('bodyFinalizarServico',bodyFinalizarServico)

  }

  closeDialog(){
    this.visualizarServicoDialog = false
    this.dialogClosed.emit();
  }

}

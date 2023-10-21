import { MessageService } from 'primeng/api';
import { AtendimentoService } from './../../atendimento.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { json_servico } from './json-servico-cliente';
import { JSONServico } from '../../DTO/atendimentoDTO';

@Component({
  selector: 'app-visualizar-servico',
  templateUrl: './visualizar-servico.component.html',
  styleUrls: ['./visualizar-servico.component.scss'],
  providers:[MessageService]
})
export class VisualizarServicoComponent {

  constructor(
    private atendimentoService:AtendimentoService,
    private messageService:MessageService,
  ){}

  @Input() visualizarServicoDialog:boolean = false
  @Output() dialogClosed = new EventEmitter<void>();
  selectAll: boolean = false;
  selectedItems:any
  servicoCliente:any;
  cdCliente:any;
  nrAtendimento:any
  veiculo:string = ""
  placa:string = ""

  getServicosByClient(cd_cliente:string, nr_atendimento:number){

    this.cdCliente = cd_cliente
    this.nrAtendimento = nr_atendimento

    this.atendimentoService.getAtendimentosAgendamento(cd_cliente)
    .subscribe({
      next:(res:any) => {
        const { data } = res
        
        const response = json_servico(data, nr_atendimento)
        this.servicoCliente = response
        this.veiculo = response[0].modelo_veiculo
        this.placa = response[0].placa
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

    this.atendimentoService.finalizarServico(bodyFinalizarServico)
    .subscribe({
      next:(res:any) => {
        const { message } = res
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: message,
        });
        this.getServicosByClient(this.cdCliente, this.nrAtendimento)
        this.selectedItems = []
      }, error:(res:any) => {
        console.log()
      }
    })


  }

  closeDialog(){
    this.visualizarServicoDialog = false
    this.dialogClosed.emit();
  }

}

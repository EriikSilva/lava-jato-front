import { MessageService } from 'primeng/api';
import { AtendimentoService } from './../../atendimento.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { json_servico } from './json-servico-cliente';
import { FinalizarServicoDTO, ItensSelecionadosDTO, ServicoClienteDTO } from '../../DTO/atendimentoDTO';

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
  selectedItems:ItensSelecionadosDTO[] = []
  servicoCliente:ServicoClienteDTO[] = [];
  cdCliente:string = ""
  nrAtendimento:number = 0;
  veiculo:string = ""
  placa:string = ""

  getServicosByClient(cd_cliente:string, nr_atendimento:number){

    this.cdCliente = cd_cliente
    this.nrAtendimento = nr_atendimento

    this.atendimentoService.getServicosEmAndamento(nr_atendimento)
    .subscribe({
      next:(res:any) => {
        const { data } = res
        const response = json_servico(data, this.nrAtendimento)
        this.servicoCliente = response
        this.veiculo = response[0].modelo_veiculo
        this.placa = response[0].placa

      }
    })

    // this.atendimentoService.getAtendimentosAgendamento(cd_cliente)
    // .subscribe({
    //   next:(res:any) => {
    //     const { data } = res
    //     console.log('data', data)
        
    //     const response = json_servico(data, nr_atendimento)
    //     console.log('res', response)
    //     this.servicoCliente = response
    //     this.veiculo = response[0].modelo_veiculo
    //     this.placa = response[0].placa
    //   }
    // })
  }

  finalizarServico(){
    const cdServicoArray = this.selectedItems.map(item => item.cd_servico.toString());

    const bodyFinalizarServico:FinalizarServicoDTO = {
      nr_atendimento_p:String(this.nrAtendimento),
      nr_servico_p: cdServicoArray
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
        console.log(res)
        const { error } = res.error
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: error,
        });
      }
    })


  }

  closeDialog(){
    this.visualizarServicoDialog = false
    this.dialogClosed.emit();
  }

}

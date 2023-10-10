import { ClientesService } from './../../../clientes/clientes.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ClienteGetDTO } from 'src/app/components/clientes/DTO/clientesDTO';
import { CarrosService } from 'src/app/components/clientes/carros.service';

@Component({
  selector: 'app-finalizar-atendimento',
  templateUrl: './finalizar-atendimento.component.html',
  styleUrls: ['./finalizar-atendimento.component.scss']
})
export class FinalizarAtendimentoComponent implements OnInit{

  constructor(
    private clientesService:ClientesService,
    private carrosService:CarrosService
  ){}

  @Input() finalizarAtendimentoDialog:boolean = false
  @Output() dialogClosed = new EventEmitter<void>();

  clientes:any
  placa:any
  cd_veiculo:any

  carroCliente:any


  finalizarAtendimentoForm = new FormGroup({
    cd_agenda_p:  new FormControl(''),
    cd_servico_p: new FormArray([]),
    cd_veiculo_p: new FormControl(""),
    cd_cliente_p: new FormControl("")
  })

  ngOnInit(): void {
    this.getClientes()
  }


  getClientes(){
    this.clientesService.getClients()
    .subscribe({
      next:(res:any) => {
        const { data } = res
        this.clientes = data
      }
    })
  }
//   {
//     "cd_agenda_p":246,
//     "cd_cliente_p":3,
//     "cd_usuario_p": 1,
//     "cd_servico_p":[7],
// }   
onDropdownChange(cliente:any){
  const { value } = cliente
  this.carroCliente = value
  this.getCarroCliente(value.cd_cliente)
}

onDropdownChange2(cliente:any){
  const { value } = cliente
  this.placa = value.placa
  this.cd_veiculo = value.cd_veiculo
}


  getCarroCliente(cd_client:number){
    this.carrosService.getVeiculoCliente(cd_client)
    .subscribe({
      next:(res:any) => {
        const { data } = res
        this.carroCliente = data
      }
    })
  }



  closeDialog(){
    this.finalizarAtendimentoDialog = false
    this.dialogClosed.emit();
  }

}

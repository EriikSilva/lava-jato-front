import { ClientesService } from 'src/app/components/clientes/clientes.service';
import { CarrosService } from './../../../clientes/carros.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ServicosService } from 'src/app/components/servicos/servicos.service';

@Component({
  selector: 'app-new-atendimento',
  templateUrl: './new-atendimento.component.html',
  styleUrls: ['./new-atendimento.component.scss']
})
export class NewAtendimentoComponent implements OnInit{

  constructor
  (
    private carrosService:CarrosService,
    private clienteService:ClientesService,
    private servicosService:ServicosService
  ){}

  @Input() atendimentoDialog:boolean = false
  @Output() dialogClosed = new EventEmitter<void>();

  
  clientes:any
  carroCliente:any
  placa:any
  cd_veiculo:any
  servicos:any
    
  ngOnInit(): void {
    this.getClientes()
    this.getServicos();
  }

  newAtendimentoForm = new FormGroup({
    horario_p:  new FormControl(''),
    cd_servico_p: new FormArray([]),
    cd_veiculo_p: new FormControl(""),
    cd_cliente_p: new FormControl(""),
    placa_p:new FormControl("")
  })


  saveNewAtendimento(){
    const formValue = this.newAtendimentoForm.value;

    console.log('form',formValue)
  }

  getCarrosCliente(cd_cliente:any){
    this.carrosService.getVeiculoCliente(cd_cliente)
    .subscribe({
      next:(res:any) => {
        const { data } = res
        this.clientes = data
      }
    })
  }


  getServicos(){
    this.servicosService.getServicos()
    .subscribe((res:any) => {
      const { data } = res
      this.servicos = data
    })
  }

  getClientes(){
    this.clienteService.getClients()
    .subscribe({
      next:(res:any) => {
        const { data } = res
        this.clientes = data
      }
    })
  }


  onDropdownChangeCliente(cliente:any){
    const { value } = cliente
    this.carroCliente = value 
    this.getCarroCliente(value.cd_cliente)
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


  onDropdownChangeCarro(cliente:any){
    const { value } = cliente
    this.placa = value.placa
    this.cd_veiculo = value.cd_veiculo
  }

  onDropdownChange3(servico:any){
    
  }
  

  closeDialog(){
    this.atendimentoDialog = false
    this.dialogClosed.emit();
  }
  
}

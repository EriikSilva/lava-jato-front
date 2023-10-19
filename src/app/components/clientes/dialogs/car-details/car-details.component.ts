import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ClienteGetDTO, VeiculosCliente } from '../../DTO/clientesDTO';
import { CarrosService } from '../../carros.service';
import { GetTypeCarDTO, editClientCarDTO } from '../../DTO/carrosDTO';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { NewCarComponent } from '../new-car/new-car.component';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss'],
  providers: [MessageService]
})
export class CarDetailsComponent{

  @ViewChild('NewCarComponent') NewCarComponent: NewCarComponent | undefined;

  constructor(
    private carrosService:CarrosService,
    private confirmationService: ConfirmationService,
    private messageService:MessageService,
  ){}

  @Input() carClientDialog: boolean = false;
  @Input() position: string = 'center';
  @Input() cd_cliente: any;
  
  @Output() dialogClosed = new EventEmitter<void>();


  editMode:boolean = false;
  saveMode:boolean = false
  
  
  messages:Message[] = [];
  carsType:any
  clientsVehicles?: Array<VeiculosCliente> | any;
  newCarDialog: boolean = false;
  showNoDataMessage = false;


  carClientModal(position: string, cliente: ClienteGetDTO) {
    const { cd_cliente } = cliente;

    this.cd_cliente      = cd_cliente
    this.position        = position;
    this.carClientDialog = true;
    this.getCarByClient(cd_cliente)
  }

  getCarByClient(cd_cliente:any){
    this.carrosService.getCarByClient(cd_cliente)
    .subscribe({
      next:(res:any) => {
        const { data } = res
        this.clientsVehicles = data
        this.showNoDataMessage = this.clientsVehicles.length === 0;
      },
      error: (res: any) => {
        this.clientsVehicles = [];
        this.showNoDataMessage = this.clientsVehicles.length === 0;
        console.log('erro', res)
      },
    })
  }


  getTipoCarros(){
    this.carrosService.getTypeCar()
    .subscribe({
      next:(res: { data: GetTypeCarDTO}) =>{
        const { data } = res
        this.carsType = data
      }, error:(error) => {
        console.log('error', error)
      }
    })
  }


  deleteCarClient(vehicle:any){
    const { cd_veiculo, cd_cliente } = vehicle

    this.carrosService.deleteClientCar(cd_veiculo)
    .subscribe({
      next: (res:any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: res.message,
        });
        this.getCarByClient(cd_cliente)
      }, error: (res:any) =>{
        const { error } = res.error
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao Deletar',
          detail: error,
        });
      }
    })
  }

  confirmDelete(event: Event, vehicle:any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja Excluir Este Carro?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.deleteCarClient(vehicle);
      },
    });
  }

  openDialogNewCar() {
    this.NewCarComponent?.resetarFormulario();
    this.newCarDialog = true;
    this.saveMode = true;
    this.editMode = false
    this.getTipoCarros();
  }


  editClientCarInputs(veiculos_clientes:editClientCarDTO){
    this.editMode = true;
    this.saveMode = false
    this.newCarDialog  = true
    this.NewCarComponent?.editClientCarInputs(veiculos_clientes)
    this.getTipoCarros();
  }

  closeDialog() {
    this.dialogClosed.emit();
  }

  
  onDialogClosed() {
    this.newCarDialog = false;
  }
}

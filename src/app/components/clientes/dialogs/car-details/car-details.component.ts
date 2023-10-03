import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClienteGetDTO, VeiculosCliente } from '../../DTO/clientesDTO';
import { CarrosService } from '../../carros.service';
import { GetTypeCarDTO } from '../../DTO/carrosDTO';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss'],
  providers: [MessageService]
})
export class CarDetailsComponent implements OnInit{

  constructor(
    private carrosService:CarrosService,
    private confirmationService: ConfirmationService,
    private messageService:MessageService,
  ){}

  @Input() carClientDialog: boolean = false;
  @Input() position: string = 'center';
  @Input() cd_cliente: any;
  
  @Output() dialogClosed = new EventEmitter<void>();
  
  
  messages:Message[] = [];
  carsType:any
  clientsVehicles?: Array<VeiculosCliente> | any;
  newCarDialog: boolean = false;
  showNoDataMessage = false;

  ngOnInit(): void {
    this.getCarByClient(this.cd_cliente);
  }

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
        console.log('this.clientsVehiclesaa', this.clientsVehicles.length == 0) // true
      }, error(res: any) {
        console.log(res)
      },
    })
  }

  openDialogNewCar() {
    this.newCarDialog = true;

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
    const { cd_veiculo } = vehicle

    this.carrosService.deleteClientCar(cd_veiculo)
    .subscribe({
      next: (res:any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: res.message,
        });
        this.getCarByClient(this.cd_cliente)
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
    console.log('vehicle',vehicle)
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

  onDialogClosed() {
    this.newCarDialog = false;
  }

  onRowEditInit(veiculos_clientes: VeiculosCliente) {
    this.clientsVehicles[veiculos_clientes.modelo as string] = {
      ...veiculos_clientes,
    };
  }

  onRowEditSave(veiculos_clientes: VeiculosCliente) {}

  onRowEditCancel(veiculos_clientes: VeiculosCliente, index: number) {
    // this.veiculos_clientes[index] = this.veiculos_clientes[veiculos_clientes.placa as string];
    // delete this.clonedProducts[product.id as string];
    console.log('veiculos_clientes', veiculos_clientes);
  }



  closeDialog() {
    this.dialogClosed.emit();
  }
}

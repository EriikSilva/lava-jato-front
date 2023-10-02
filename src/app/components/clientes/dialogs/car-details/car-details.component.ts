import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClienteGetDTO, VeiculosCliente } from '../../DTO/clientesDTO';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent {

  @Input() carClientDialog: boolean = false
  @Input() position:        string = 'center';

  @Output() dialogClosed = new EventEmitter<void>();
  
  clientsVehicles?: Array<VeiculosCliente> | any
  @Input() cd_cliente: any;



  carClientModal(position: string, cliente:ClienteGetDTO){
    const { veiculos_clientes } = cliente

    this.position        = position;
    this.carClientDialog = true
    this.clientsVehicles = veiculos_clientes
  }

  
  onRowEditInit(veiculos_clientes: VeiculosCliente) {
    this.clientsVehicles[veiculos_clientes.modelo as string] = { ...veiculos_clientes };
  }

  onRowEditSave(veiculos_clientes: VeiculosCliente) {
    
  }

  onRowEditCancel(veiculos_clientes: VeiculosCliente, index: number) {
    // this.veiculos_clientes[index] = this.veiculos_clientes[veiculos_clientes.placa as string];
    // delete this.clonedProducts[product.id as string];
    console.log('veiculos_clientes',veiculos_clientes)
  }
  

  closeDialog() {
    this.dialogClosed.emit();
  }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { postCarClientDTO } from '../../DTO/carrosDTO';
import { CarrosService } from '../../carros.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.scss'],
  providers: [MessageService]
})
export class NewCarComponent {

    constructor(
      private carrosService:CarrosService,
      private messageService:MessageService
    ){}

    @Input() carsType:         any;

    @Input()  newCarDialog: boolean = false
    @Input() cd_cliente: any;

    @Output() dialogClosed = new EventEmitter<void>();
    

    newCarForm = new FormGroup({
      placa:           new FormControl('', Validators.required),
      modelo:          new FormControl('', Validators.required),
      cd_tipo_veiculo: new FormControl('', Validators.required)
    })

    saveNewClientCar(){
      const formValue = this.newCarForm.value;
  
      const modelo = formValue.modelo || "";
      const placa  = formValue.placa  || "";
      const cd_tipo_veiculo = formValue.cd_tipo_veiculo || ""
  
      const toStringify = JSON.stringify(cd_tipo_veiculo)
      const toJson = JSON.parse(toStringify)
      const cd_tipo_veiculo_p = toJson.cd_tipo_veiculo
    
      const bodyNewCar: postCarClientDTO  = {
        modelo,
        placa,
        cd_tipo_veiculo: cd_tipo_veiculo_p,
        cd_cliente: this.cd_cliente
      }
      
      // return console.log('bodyNewCar', bodyNewCar)
      this.carrosService.postClientCar(bodyNewCar)
      .subscribe({
        next:(res:any) => {
          const { message } = res
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso ao cadastrar',
            detail: message,
          });
          this.newCarForm.reset();
          
          // this.getClients.emit();
          this.closeDialog();
        }, error: (res:any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao cadastrar',
            detail: res.error.error,
          });
        }
      })
  
    }


    closeDialog() {
      this.newCarDialog = false
      this.dialogClosed.emit();
    }
}

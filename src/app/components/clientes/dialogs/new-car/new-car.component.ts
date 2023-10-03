import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { editClientCarDTO, postCarClientDTO } from '../../DTO/carrosDTO';
import { CarrosService } from '../../carros.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.scss'],
  providers: [MessageService],
})
export class NewCarComponent {
  constructor(
    private carrosService: CarrosService,
    private messageService: MessageService
  ) {}

  @Input() carsType: any;
  @Input() newCarDialog: boolean = false;
  @Input() cd_cliente: any;
  @Input() saveMode: boolean = false;
  @Input() editMode: boolean = false;

  @Output() dialogClosed = new EventEmitter<void>();
  @Output() getCarByClient = new EventEmitter<void>();

  cd_veiculo_p?: any 

  newCarForm = new FormGroup({
    placa: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    cd_tipo_veiculo: new FormControl('', Validators.required),
  });

  saveNewClientCar() {
    const formValue = this.newCarForm.value;

    const modelo          = formValue.modelo || '';
    const placa           = formValue.placa || '';
    const cd_tipo_veiculo = formValue.cd_tipo_veiculo || '';

    const toStringify       = JSON.stringify(cd_tipo_veiculo);
    const toJson            = JSON.parse(toStringify);
    const cd_tipo_veiculo_p = toJson.cd_tipo_veiculo;

    const bodyNewCar: postCarClientDTO = {
      modelo,
      placa,
      cd_tipo_veiculo: cd_tipo_veiculo_p,
      cd_cliente: this.cd_cliente,
    };

    this.carrosService.postClientCar(bodyNewCar)
    .subscribe({
      next: (res: any) => {
        const { message } = res;
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso ao cadastrar',
          detail: message,
        });
        this.newCarForm.reset();
        this.getCarByClient.emit();
        this.closeDialog();
      },
      error: (res: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao cadastrar',
          detail: res.error.error,
        });
      },
    });
  }

  editClientCarInputs(veiculos_clientes: editClientCarDTO) {
    const { placa, modelo, cd_veiculo, cd_tipo_veiculo} = veiculos_clientes;
  
     this.cd_veiculo_p = cd_veiculo

    this.newCarForm.get('placa')?.setValue(placa);
    this.newCarForm.get('modelo')?.setValue(modelo);
    /*************************O erik do futuro vai resolver**************************************/
    // this.newCarForm.get('cd_tipo_veiculo')?.setValue(cd_tipo_veiculo)


  }

  editCarClient(){
    const formValue = this.newCarForm.value;

    const modelo          = formValue.modelo || '';
    const placa           = formValue.placa || '';
    const cd_tipo_veiculo = formValue.cd_tipo_veiculo || '';

    const toStringify       = JSON.stringify(cd_tipo_veiculo);
    const toJson            = JSON.parse(toStringify);
    const cd_tipo_veiculo_p = toJson.cd_tipo_veiculo;



    const bodyEditClientCar: editClientCarDTO = {
      modelo,
      placa,
      cd_tipo_veiculo: cd_tipo_veiculo_p,
      cd_cliente: this.cd_cliente,
      cd_veiculo:this.cd_veiculo_p
    };

    this.carrosService.editClientCar(bodyEditClientCar)
    .subscribe({
      next:(res:any) => {
        const { message } = res 
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: message,
        });
        this.closeDialog();
        this.newCarForm.reset();
        this.getCarByClient.emit();
      }, error:(res:any) => {
        const { error } = res.error 
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao Deletar',
          detail: error,
        });
      }
    })

  }

  closeDialog() {
    this.newCarDialog = false;
    this.dialogClosed.emit();
  }
}

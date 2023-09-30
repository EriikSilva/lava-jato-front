import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientesService } from './clientes.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientEditDTO, ClientRegisterDTO, ClienteGetDTO, VeiculosCliente } from './DTO/clientesDTO';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';
import {
  removerCaracteresCPF_CNPJ,
  MaskUtils,
} from '../../utils/Cpf_Cnpj_Validations';
import { CepService } from 'src/app/services/cep.service';
import { Table } from 'primeng/table';
import { CarrosService } from './carros.service';
import { GetTypeCarDTO, postCarClientDTO } from './DTO/carrosDTO';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  providers: [MessageService, MaskUtils, ConfirmationService],
})
export class ClientesComponent implements OnInit {

  @ViewChild('dt') dt: Table | undefined;

  position:         string = 'center';
  clients:          ClienteGetDTO[] = [];
  carsType:         any;
  cd_cliente:       number = 0;
  messages:         Message[] = [];
  clientsVehicles?: Array<VeiculosCliente> | any


  editMode:        boolean = false;
  saveMode:        boolean = false
  clientDialog:    boolean = false;
  carClientDialog: boolean = false;
  newCarDialog:    boolean = false

  constructor(
    private clientsService:      ClientesService,
    private messageService:      MessageService,
    private maskUtils:           MaskUtils,
    private cepService:          CepService,
    private confirmationService: ConfirmationService,
    private carrosService:       CarrosService
  ) {}

  ngOnInit(): void {
    this.getClients();
  }

  clientRegisterForm = new FormGroup({
    nm_cliente:        new FormControl('', Validators.required,),
    cpf_cnpj:          new FormControl('', Validators.required),
    cep:               new FormControl('', [Validators.required, Validators.maxLength(8)]),
    bairro:            new FormControl('', Validators.required),
    nr_casa:           new FormControl('', Validators.required),
    status:            new FormControl(false)
  });

  newClientCarForm = new FormGroup({
    placa:           new FormControl('', Validators.required),
    modelo:          new FormControl('', Validators.required),
    cd_tipo_veiculo: new FormControl('', Validators.required)
  })


  /**********************REQUESTS GET, POST, EDIT, DELETE ***************************/
  getClients() {
    this.clientsService.getClients().subscribe({
      next: (res: any) => {
        const { data } = res;
        this.clients = data;
      },
      error(res: any) {
        console.log(res.error.message);
      },
    });
  }

  saveClient() {
    const formValue = this.clientRegisterForm.value;
    const isValid   = this.validateAndShowMessage(formValue);

    if(isValid){
      const nm_cliente        = formValue.nm_cliente || '';
      const cpf_cnpj          = formValue.cpf_cnpj || '';
      const cpf_cnpjFormatado = removerCaracteresCPF_CNPJ(cpf_cnpj);
      const cep               = formValue.cep || '';
      const bairro            = formValue.bairro || '';
      const nr_casa           = formValue.nr_casa || '';
  
      const bodyRegistro: ClientRegisterDTO = {
        nm_cliente,
        cpf_cnpj: cpf_cnpjFormatado,
        cep,
        bairro,
        nr_casa,
      };
  
      this.clientsService.postClients(bodyRegistro).subscribe({
        next: (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso ao cadastrar',
            detail: res.data.message,
          });
          this.clientRegisterForm.reset();
          this.hideDialog();
          this.getClients();
        },
        error: (res: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao cadastrar',
            detail: res.error.data.message,
          });
        },
      });
    }
  }

  editClient(){
    const formValue = this.clientRegisterForm.value;
    const isValid   = this.validateAndShowMessage(formValue);

    if(isValid){
      const nm_cliente        = formValue.nm_cliente || '';
      const cpf_cnpj          = formValue.cpf_cnpj || '';
      const cpf_cnpjFormatado = removerCaracteresCPF_CNPJ(cpf_cnpj);
      const cep               = formValue.cep || '';
      const bairro            = formValue.bairro || '';
      const nr_casa           = formValue.nr_casa || '';
      const status            = formValue.status || '';
  
      const bodyEdit: ClientEditDTO = {
        nm_cliente,
        cd_cliente:this.cd_cliente,
        status: status == true ? "I" : "A",
        cpf_cnpj: cpf_cnpjFormatado,
        cep,
        bairro,
        nr_casa,
      };
  
     this.clientsService.editClient(bodyEdit)
     .subscribe({
        next: (res: any) => {
          console.log('res', res)
          this.messageService.add({
            severity: 'success',
            summary: 'Edição',
            detail: 'Sucesso ao Editar',
          });
          this.clientRegisterForm.reset();
          this.hideDialog();
          this.getClients();
        },
        error: (res: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao cadastrar',
            detail: res.error.data.message,
          });
        },
      });
    }
  }

  deleteClient(cliente: { cd_cliente: number }) {
    const { cd_cliente } = cliente;
    this.clientsService.deleteClient({ cd_cliente }).subscribe({
      next: (res: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: res.message,
        });
        this.getClients();
      },
      error: (res: any) => {
        const { error } = res
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao deletar',
          detail: error.error,
        });
      },
    });
  }


  /*******************CAR REQUESTS**************************/

  saveNewClientCar(){
    const formValue = this.newClientCarForm.value;

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

    this.carrosService.postClientCar(bodyNewCar)
    .subscribe({
      next:(res:any) => {
        const { message } = res
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso ao cadastrar',
          detail: message,
        });
        this.newClientCarForm.reset();
        this.getClients();
        this.hideNewCarDialog();
      }, error: (res:any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao cadastrar',
          detail: res.error.error,
        });
      }
    })

  }


  /*******************DIALOG********************/
  openNew() {
    this.clientRegisterForm.reset();
    this.saveMode = true
    this.editMode = false
    this.clientDialog = true;
  }

  hideDialog() {
    this.clientDialog = false;
  }
  hideNewCarDialog(){
    this.newCarDialog = false
  }


  editClientModal(cliente: ClientEditDTO) {
    this.cd_cliente    = cliente.cd_cliente
    this.editMode      = true;
    this.saveMode      = false
    this.clientDialog  = true;
    this.clientRegisterForm.get('nm_cliente')?.setValue(cliente.nm_cliente);
    this.clientRegisterForm.get('cpf_cnpj')?.setValue(cliente.cpf_cnpj);
    this.clientRegisterForm.get('cep')?.setValue(cliente.cep);
    this.clientRegisterForm.get('bairro')?.setValue(cliente.bairro);
    this.clientRegisterForm.get('nr_casa')?.setValue(cliente.nr_casa); 
    const statusControl = this.clientRegisterForm.get('status');

    statusControl?.setValue(cliente.status === 'I' ? true : false);
  }

  carClientModal(position: string, cliente:ClienteGetDTO){
    const { veiculos_clientes, cd_cliente } = cliente

    this.position        = position;
    this.carClientDialog = true
    this.clientsVehicles = veiculos_clientes
    this.cd_cliente      = cd_cliente
  }

  openDialogNewCar(){
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


  //UTILS

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


  private validateAndShowMessage(formValue: any) {
    if (this.clientRegisterForm.invalid) {
      if (
        formValue.cpf_cnpj?.length !== 14 &&
        formValue.cpf_cnpj?.length !== 18
      ) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Validação',
          detail: 'Campo CPF/CNPJ Inválido',
        });
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Validação',
          detail: 'Preencha os Campos Obrigatórios',
        });
      }
      return false; 
    }
    return true;
  }
  

  confirmDelete(event: Event, cliente: ClienteGetDTO) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja Excluir Este Cliente?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.deleteClient(cliente);
      },
    });
  }

  formatCpfCnpj(value: string): string {
    return this.maskUtils.formatCpfCnpj(value);
  }

  getBairroByCpf() {
    const formValue = this.clientRegisterForm.value;

    if (formValue.cep?.length == 8) {
      this.cepService.getEnderecoByCep(formValue.cep).subscribe((data) => {
        this.clientRegisterForm.get('bairro')?.setValue(data.bairro);
        formValue.bairro = data.bairro || '';
      });
    }
  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}

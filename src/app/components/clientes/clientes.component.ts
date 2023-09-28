import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientesService } from './clientes.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientEditDTO, ClientRegisterDTO } from './DTO/clientesDTO';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';
import {
  removerCaracteresCPF_CNPJ,
  MaskUtils,
} from '../../utils/Cpf_Cnpj_Validations';
import { CepService } from 'src/app/services/cep.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  providers: [MessageService, MaskUtils, ConfirmationService],
})
export class ClientesComponent implements OnInit {

  @ViewChild('dt') dt: Table | undefined;

  clients: any[] = [];
  cd_cliente: number = 0;
  clonedProducts: any;
  messages: Message[] = [];
  editMode: boolean = false;
  saveMode: boolean = false

  clientDialog: boolean = false;

  constructor(
    private clientsService:      ClientesService,
    private messageService:      MessageService,
    private maskUtils:           MaskUtils,
    private cepService:          CepService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getClients();
  }

  clientRegisterForm = new FormGroup({
    nm_cliente:        new FormControl('', Validators.required),
    cpf_cnpj:          new FormControl('', Validators.required),
    cep:               new FormControl('', [Validators.required, Validators.maxLength(8)]),
    bairro:            new FormControl('', Validators.required),
    nr_casa:           new FormControl('', Validators.required),
    status:            new FormControl(false)
  });

  /**********************REQUESTS GET, POST, EDIT, DELETE ***************************/
  getClients() {
    this.clientsService.getClients().subscribe({
      next: (res: any) => {
        const { data } = res.data;
        console.log('data', data);
        this.clients = data;
      },
      error(res: any) {
        console.log(res.error.message);
      },
    });
  }

  saveClient() {
    const formValue = this.clientRegisterForm.value;

    if (this.clientRegisterForm.invalid) {
      if (
        formValue.cpf_cnpj?.length !== 14 &&
        formValue.cpf_cnpj?.length !== 18
      ) {
        return this.messageService.add({
          severity: 'warn',
          summary: 'Validação',
          detail: 'Campo CPF/CNPJ Inválido',
        });
      }

      return this.messageService.add({
        severity: 'warn',
        summary: 'Validação',
        detail: 'Preencha os Campos Obrigatórios',
      });
    }

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

  editClient(){
    const formValue = this.clientRegisterForm.value;

    if (this.clientRegisterForm.invalid) {
      if (
        formValue.cpf_cnpj?.length !== 14 &&
        formValue.cpf_cnpj?.length !== 18
      ) {
        return this.messageService.add({
          severity: 'warn',
          summary: 'Validação',
          detail: 'Campo CPF/CNPJ Inválido',
        });
      }

      return this.messageService.add({
        severity: 'warn',
        summary: 'Validação',
        detail: 'Preencha os Campos Obrigatórios',
      });
    }

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

   this.clientsService.editClient(bodyEdit).subscribe({
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
        console.log(res);
      },
    });
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

  editClientModal(cliente: any) {
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

  //UTILS

  confirmDelete(event: Event, cliente: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja Excluir Cliente?',
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

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CepService } from 'src/app/services/cep.service';
import { ClientesService } from '../../clientes.service';
import { ClientEditDTO, ClientRegisterDTO } from '../../DTO/clientesDTO';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MaskUtils, removerCaracteresCPF_CNPJ } from 'src/app/utils/Cpf_Cnpj_Validations';

@Component({
  selector: 'app-save-edit-client',
  templateUrl: './save-edit-client.component.html',
  styleUrls: ['./save-edit-client.component.scss'],
  providers: [MessageService, MaskUtils, ConfirmationService],
})
export class SaveEditClientComponent {

  @Input() cd_cliente: any;
  @Input() clientDialog: boolean = false;
  @Input() saveMode: boolean     = false;
  @Input() editMode: boolean     = false;

  @Output() dialogClosed = new EventEmitter<void>();
  @Output() getClients  = new EventEmitter<any>();

  constructor(
    private cepService:    CepService,
    private clientsService:ClientesService,
    private messageService:MessageService,
    ){}

    clientRegisterForm = new FormGroup({
    nm_cliente:        new FormControl('', Validators.required,),
    cpf_cnpj:          new FormControl('', Validators.required),
    cep:               new FormControl('', [Validators.required, Validators.maxLength(8)]),
    bairro:            new FormControl('', Validators.required),
    nr_casa:           new FormControl('', Validators.required),
    status:            new FormControl(false)
  });

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
  
      this.clientsService.postClients(bodyRegistro)
      .subscribe({
        next: (res: any) => {
          const { message } = res

          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso ao cadastrar',
            detail: message,
          });
          this.clientRegisterForm.reset();
          this.hideDialog();
          this.getClients.emit();
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
          this.getClients.emit();
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

  getBairroByCpf() {
    const formValue = this.clientRegisterForm.value;

    if (formValue.cep?.length == 8) {
      this.cepService.getEnderecoByCep(formValue.cep).subscribe((data) => {
        this.clientRegisterForm.get('bairro')?.setValue(data.bairro);
        formValue.bairro = data.bairro || '';
      });
    }
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

  hideDialog() {
    this.clientDialog = false;
  }

  closeDialog() {
    this.dialogClosed.emit();
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

  resetarFormulario(){
    this.clientRegisterForm.reset();
  }
}

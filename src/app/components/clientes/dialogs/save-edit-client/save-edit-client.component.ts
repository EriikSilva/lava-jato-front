import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CepService } from 'src/app/services/cep.service';
import { ClientesService } from '../../clientes.service';
import { ClientEditDTO, ClientRegisterDTO } from '../../DTO/clientesDTO';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MaskUtils, removerCaracteresCPF_CNPJ, removeCaracteresTelefone } from 'src/app/utils/Cpf_Cnpj_Validations';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-save-edit-client',
  templateUrl: './save-edit-client.component.html',
  styleUrls: ['./save-edit-client.component.scss'],
  providers: [MessageService, MaskUtils, ConfirmationService],
})
export class SaveEditClientComponent implements OnDestroy{
  
  private destroy$: Subject<void> = new Subject<void>();

  isLoading:Boolean = false
  buttonLoading:boolean = false

  @Input() cd_cliente: any;
  @Input() clientDialog: boolean = false;
  @Input() saveMode:     boolean = false;
  @Input() editMode:     boolean = false;

  @Output() dialogClosed = new EventEmitter<void>();
  @Output() getClients   = new EventEmitter<any>();

  constructor(
    private cepService:    CepService,
    private clientsService:ClientesService,
    private messageService:MessageService,
    private maskUtils:     MaskUtils
    ){}

  clientRegisterForm = new FormGroup({
    nm_cliente:        new FormControl('', Validators.required,),
    cpf_cnpj:          new FormControl('', Validators.required),
    cep:               new FormControl('', [Validators.required, Validators.maxLength(8)]),
    bairro:            new FormControl('', Validators.required),
    rua:               new FormControl('', Validators.required),
    nr_casa:           new FormControl('', Validators.required),
    telefone1:         new FormControl('', [Validators.required, Validators.minLength(11)]),
    telefone2:         new FormControl(''),
    status:            new FormControl(false)
  });

  saveClient() {
    const formValue = this.clientRegisterForm.value;
    const isValid   = this.validateAndShowMessage(formValue);

    if(isValid){
      const nm_cliente        = String(formValue.nm_cliente);
      const cpf_cnpj          = String(formValue.cpf_cnpj);
      const cpf_cnpjFormatado = removerCaracteresCPF_CNPJ(cpf_cnpj);
      const cep               = String(formValue.cep);
      const bairro            = String(formValue.bairro);
      const nr_casa           = String(formValue.nr_casa);
      const rua               = String(formValue.rua);
      const telefone1         = String(formValue.telefone1);
      const telefone2         = String(formValue.telefone2);
      const cd_usuario        = Number(localStorage.getItem("cd_usuario"))

      const telefone1Formatado = removeCaracteresTelefone(telefone1)
      const telefone2Formatado = removeCaracteresTelefone(telefone2)
  
      const bodyRegistro: ClientRegisterDTO = {
        nm_cliente,
        cpf_cnpj: cpf_cnpjFormatado,
        cep,
        bairro,
        nr_casa,
        rua,
        telefone1: telefone1Formatado,
        telefone2: telefone2Formatado,
        cd_usuario
      }
      this.isLoading = true;
      this.clientsService.postClients(bodyRegistro)
      .subscribe({
        next: (res: any) => {
          const { message } = res
          this.closeDialog();
          this.clientRegisterForm.reset();
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso ao cadastrar',
            detail: message,
          });    
          this.getClients.emit();
          this.isLoading = false
        },
        error: (res: any) => {
          this.isLoading = false
          const { message } = res.error
          this.messageService.add({
            severity: 'error',
            summary:  'Erro ao cadastrar',
            detail: message,
          });
        },
      });
    }
  }

  editClient(){
    const formValue = this.clientRegisterForm.value;
    const isValid   = this.validateAndShowMessage(formValue);

    if(isValid){
      const nm_cliente        = String(formValue.nm_cliente) ;
      const cpf_cnpj          = String(formValue.cpf_cnpj) ;
      const cpf_cnpjFormatado = removerCaracteresCPF_CNPJ(cpf_cnpj);
      const cep               = String(formValue.cep) ;
      const bairro            = String(formValue.bairro) ;
      const nr_casa           = String(formValue.nr_casa) ;
      const rua               = String(formValue.rua) ;
      const status            = Boolean(formValue.status) ;
      const telefone1         = String(formValue.telefone1) ;
      const telefone2         = String(formValue.telefone2) ;

      const telefone1Formatado = removeCaracteresTelefone(telefone1)
      const telefone2Formatado = removeCaracteresTelefone(telefone2)
  
      const bodyEdit: ClientEditDTO = {
        nm_cliente,
        cd_cliente:this.cd_cliente,
        status: status == true ? "I" : "A",
        cpf_cnpj: cpf_cnpjFormatado,
        cep,
        bairro,
        nr_casa,
        rua,
        telefone1: telefone1Formatado,
        telefone2: telefone2Formatado
      };
      this.buttonLoading = true

     this.clientsService.editClient(bodyEdit)
     .subscribe({
        next: (res: any) => {
          this.buttonLoading = false
          const { message } = res
          this.closeDialog();
          this.clientRegisterForm.reset();
          this.getClients.emit();
          this.messageService.add({
            severity: 'success',
            summary: 'Edição',
            detail: message
          });
        },
        error: (res: any) => {
          const { error } = res.error
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao Editar',
            detail: error,
          });
        },
      });
    }
  }

  getBairroByCep() {
    const formValue = this.clientRegisterForm.value;

    if (formValue.cep && formValue.cep?.length >= 8) {
      this.cepService.getEnderecoByCep(formValue.cep)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        const { bairro, logradouro} = data
        this.clientRegisterForm.get('bairro')?.setValue(bairro);
        this.clientRegisterForm.get('rua')?.setValue(logradouro)
        formValue.bairro = bairro
        formValue.rua = logradouro
      });
    }
  }

  private validateAndShowMessage(formValue: any) {
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

    if (this.clientRegisterForm.invalid) {
      return this.messageService.add({
          severity: 'warn',
          summary: 'Validação',
          detail: 'Preencha os Campos Obrigatórios',
        });
    }
    return true;
  }

  closeDialog() {
    this.clientDialog = false;
    this.dialogClosed.emit();
  }

  editClientModal(cliente: ClientEditDTO) {
    const { cd_cliente, nm_cliente, cpf_cnpj, cep, bairro, rua , nr_casa, telefone1, telefone2, status} = cliente

    this.cd_cliente    = cd_cliente
    this.clientRegisterForm.get('nm_cliente')?.setValue(nm_cliente);
    this.clientRegisterForm.get('cpf_cnpj')?.setValue(this.formatCpfCnpj(cpf_cnpj));
    this.clientRegisterForm.get('cep')?.setValue(cep);
    this.clientRegisterForm.get('bairro')?.setValue(bairro);
    this.clientRegisterForm.get('rua')?.setValue(rua)
    this.clientRegisterForm.get('nr_casa')?.setValue(nr_casa); 
    this.clientRegisterForm.get('telefone1')?.setValue(telefone1); 
    this.clientRegisterForm.get('telefone2')?.setValue(telefone2); 
    const statusControl = this.clientRegisterForm.get('status');

    statusControl?.setValue(status === 'I' ? true : false);
  }

  resetarFormulario(){
    this.clientRegisterForm.reset();
  }

  formatCpfCnpj(value: string): string {
    return this.maskUtils.formatCpfCnpj(value);
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

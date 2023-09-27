import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientRegisterDTO } from './DTO/clientesDTO';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/api';
import { removerCaracteresCPF_CNPJ, MaskUtils } from '../../utils/Cpf_Cnpj_Validations'
import { CepService } from 'src/app/services/cep.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  providers: [MessageService, MaskUtils]
})
export class ClientesComponent implements OnInit{

  clients: any[] = []
  clonedProducts: any
  messages: Message[] = [];

  clientDialog: boolean = false;

  constructor(
    private clientsService:ClientesService,
    private messageService: MessageService,
    private maskUtils: MaskUtils,
    private cepService: CepService
    ){}

  ngOnInit(): void {
      this.getClients();
  }

  clientRegisterForm = new FormGroup({
    nm_cliente: new FormControl('', Validators.required),
    cpf_cnpj:   new FormControl('', Validators.required),
    cep:        new FormControl('', [Validators.required, Validators.maxLength(9)]),
    bairro:     new FormControl('', Validators.required),
    nr_casa:    new FormControl('', Validators.required)
  })

 /**********************REQUESTS GET, POST, EDIT, DELETE ***************************/
  getClients(){
    this.clientsService.getClients()
    .subscribe({
      next: (res:any) => {
        const { data } = res.data
        console.log('data', data)
        this.clients = data
      }, error(res:any){
        console.log(res.error.message)
      } 
    })

    //UTILS
  }

  getBairroByCpf() {
    const formValue = this.clientRegisterForm.value

    if(formValue.cep?.length == 8){
        this.cepService.getEnderecoByCep(formValue.cep)
        .subscribe((data) => {
          this.clientRegisterForm.get('bairro')?.setValue(data.bairro)
          formValue.bairro = data.bairro || '';
        });
      }
  }

  saveClient(){ 
    const formValue = this.clientRegisterForm.value
    
    if(this.clientRegisterForm.invalid){
      if((formValue.cpf_cnpj?.length !== 14 && formValue.cpf_cnpj?.length !== 18)){
        return this.messageService.add({
          severity: 'warn',
          summary: 'Validação',
          detail: "Campo CPF/CNPJ Inválido",
        });
      } 

      return this.messageService.add({
        severity: 'warn',
        summary: 'Validação',
        detail: "Preencha os Campos Obrigatórios",
      });
    }

 


    const nm_cliente        = formValue.nm_cliente || "";
    const cpf_cnpj          = formValue.cpf_cnpj || "";
    const cpf_cnpjFormatado = removerCaracteresCPF_CNPJ(cpf_cnpj);
    const cep               = formValue.cep || "";
    const bairro            = formValue.bairro || "";
    const nr_casa           = formValue.nr_casa || "";

    const bodyRegistro: ClientRegisterDTO = {
      nm_cliente,
      cpf_cnpj:cpf_cnpjFormatado,
      cep,
      bairro,
      nr_casa
    }
    
    this.clientsService.postClients(bodyRegistro)
    .subscribe({
      next: (res:any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso ao cadastrar',
          detail: res.data.message,
        });
        this.hideDialog();
        this.getClients();
      },
       error: (res:any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao cadastrar',
          detail: res.error.data.message,
        });

      }
    })
  }


  editClient(cliente:any){
    console.log('asçkdjaslkdj')
  }

  deleteClient(cliente:{ cd_cliente:number }){
    const { cd_cliente } = cliente
    this.clientsService.deleteClient({cd_cliente})
    .subscribe({
      next: (res:any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: res.message,
        });
        this.getClients();

      }, error: (res:any) => {
        console.log(res)
      }
    })

  }

  /*******************DIALOG********************/
  openNew() {
    this.clientDialog = true;
  }

  hideDialog(){
    this.clientDialog = false;
  }

  //UTILS
  formatCpfCnpj(value: string): string {
    return this.maskUtils.formatCpfCnpj(value);
  }
}

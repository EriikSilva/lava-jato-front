import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientRegisterDTO } from './DTO/clientesDTO';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit{

  clients: any[] = []
  clonedProducts: any


  clientDialog: boolean = false;

  constructor(private clientsService:ClientesService){}

  ngOnInit(): void {
      this.getClients();
  }

  clientRegisterForm = new FormGroup({
    nm_cliente: new FormControl('', Validators.required),
    cpf_cnpj:   new FormControl('', Validators.required),
    cep:        new FormControl('', Validators.required),
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
  }

  saveClient(){
    const formValue = this.clientRegisterForm.value

    const nm_cliente = formValue.nm_cliente || "";
    const cpf_cnpj   = formValue.cpf_cnpj || "";
    const cep        = formValue.cep || "";
    const bairro     = formValue.bairro || "";
    const nr_casa    = formValue.nr_casa || "";

    const bodyRegistro:ClientRegisterDTO = {
      nm_cliente,
      cpf_cnpj,
      cep,
      bairro,
      nr_casa
    }
    
    this.clientsService.postClients(bodyRegistro)
    .subscribe({
      next: (res:any) => {
        console.log(res)
      },
       error: (res:any) => {
        console.log('res', res)
      }
    })
  }


  editClient(cliente:any){
    console.log('asçkdjaslkdj')
  }

  deleteClient(cliente:any){
    console.log('aksdjklasjd')
  }



  /*******************DIALOG********************/
  openNew() {
    this.clientDialog = true;
  }

  hideDialog(){
    this.clientDialog = false;
  }

 



}

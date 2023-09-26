import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';

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

  // DIALOG
  openNew() {
    this.clientDialog = true;
  }

  hideDialog(){
    this.clientDialog = false;
  }

  saveClient(){
    console.log('aslçkdjasldkj')
  }

}

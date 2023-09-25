import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit{


  constructor(private clientsService:ClientesService){}

  ngOnInit(): void {
      this.getClients();
  }

  getClients(){
    this.clientsService.getClients()
    .subscribe({
      next: (res:any) => {
        console.log('res', res)
      }, error(res:any){
        console.log(res.error.message)
      } 
    })

  }

}

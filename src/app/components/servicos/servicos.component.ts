import { ServicosService } from './servicos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss']
})
export class ServicosComponent implements OnInit {
  servicos: any

  constructor(private servicosService:ServicosService){}

  ngOnInit(): void {
    this.getServicos()
  }


  getServicos(){
    this.servicosService.getServicos()
    .subscribe({
      next:(res:any) => {
        const { data } = res
        console.log('data',data)
        this.servicos = data
      }
    })
  }
  
}

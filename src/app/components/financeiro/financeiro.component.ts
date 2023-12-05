import { Component, OnInit } from '@angular/core';
import { FinanceiroService } from './financeiro.service';

@Component({
  selector: 'app-financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.scss'],
  providers: [FinanceiroService]
})
export class FinanceiroComponent implements OnInit{
 
  movimentacoes: [] = [];
  isLoading: boolean = false;
  requisicaoCompleta: boolean = false

  ngOnInit(): void {
    this.listarMovimentacoes();
  }
    
  constructor(
    private financeiroService:FinanceiroService
  ){}
  

  listarMovimentacoes(){
    this.financeiroService.getListaMovimetacoes()
    .subscribe({
      next:(res:any) => {
        this.isLoading = true;
        const { data } = res

        setTimeout(() => {
          this.isLoading = false
          this.requisicaoCompleta = true
        }, 1000)

        this.movimentacoes = data
      }, error:(res) => {
        this.isLoading = false;
        console.log(res)
      }
    })
  }

 


}

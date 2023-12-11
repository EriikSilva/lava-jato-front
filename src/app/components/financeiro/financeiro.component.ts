import { Component, OnInit, ViewChild } from '@angular/core';
import { FinanceiroService } from './financeiro.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.scss'],
  providers: [FinanceiroService]
})
export class FinanceiroComponent implements OnInit{
 
  @ViewChild('dt') dt: Table | undefined;

  movimentacoes: [] = [];
  dadosDetalhados: [] = [];
  isLoading: boolean = false;
  requisicaoCompleta: boolean = false
  dialogTransacoes: boolean = false
  showNoDataMessage:boolean = false

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

  async getDetail(movimentacao:any){
    const { nr_atendimento, seq_financeiro } = movimentacao;
    await this.financeiroService.getListaTransacoes(nr_atendimento, seq_financeiro).
    subscribe({
      next:(res:any) => {
        const { data } = res
        this.dadosDetalhados = data
        this.dialogTransacoes = true;
        
        this.dadosDetalhados.length > 0 ? this.showNoDataMessage = false : this.showNoDataMessage = true
      }
    })
  }

  closeDialog(){
    this.dialogTransacoes = false
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}

import { TiposPagamentoService } from './tipos-pagamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-tipos-pagamento',
  templateUrl: './tipos-pagamento.component.html',
  styleUrls: ['./tipos-pagamento.component.scss']
})
export class TiposPagamentoComponent implements OnInit{

  @ViewChild('dt') dt: Table | undefined;

  tiposPagamento:any
  progressSpinner: boolean = false;
  buttonLoading: boolean = false;
  saveButton: boolean = true;
  editButton: boolean = false;

  constructor(private tiposPagamentoService:TiposPagamentoService){}

  newTipoPagamentoForm = new FormGroup({
    descricao: new FormControl('', [Validators.maxLength(2)]),
    qtd_parcelas: new FormControl(null)
  })


  ngOnInit(): void {
    this.getTiposPagamento();
  }

  getTiposPagamento(){
    this.tiposPagamentoService.getTiposPagamento()
    .subscribe({
      next:(res:any) => {
        const { data } = res
        this.tiposPagamento = data
      }
    })
  }

  salvarTipoPagamento(){
    
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}

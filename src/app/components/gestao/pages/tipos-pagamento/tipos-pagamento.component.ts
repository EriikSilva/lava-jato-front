import { TiposPagamentoService } from './tipos-pagamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { PostTipoPagamento } from '../../DTO/servicos.DTO';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-tipos-pagamento',
  templateUrl: './tipos-pagamento.component.html',
  styleUrls: ['./tipos-pagamento.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class TiposPagamentoComponent implements OnInit{

  @ViewChild('dt') dt: Table | undefined;

  tiposPagamento:any
  progressSpinner: boolean = false;
  buttonLoading: boolean = false;
  saveButton: boolean = true;
  editButton: boolean = false;
  parcelas_p:number = 0

  parcelas = [
    {label:'1'},
    {label:'2'},
    {label:'3'},
    {label:'4'},    
  ]

  constructor(
    private tiposPagamentoService:TiposPagamentoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
    ){}

  newTipoPagamentoForm = new FormGroup({
    descricao: new FormControl(''),
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
    const formValue = this.newTipoPagamentoForm.value;
    const descricao = String(formValue.descricao);

    const body:PostTipoPagamento = {
      descricao,
      qtd_parcelas: this.parcelas_p
    }
    this.buttonLoading = true;
    
    this.tiposPagamentoService.postTiposPagamento(body)
    .subscribe({
      next:(res:any) => {
        const { message } = res;
        this.buttonLoading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso ao cadastrar',
          detail: message,
        });
        this.limparDados();
      }, error:(res:any) => {
        this.buttonLoading = false;
        const { error } = res.error
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao cadastrar',
          detail: error,
        });
      }
    })

  }

  limparDados(){
    this.newTipoPagamentoForm.reset();
  }

  onDropdownChangeParcelas(event:any){
    const { value } = event
    this.parcelas_p = Number(value.label)
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}

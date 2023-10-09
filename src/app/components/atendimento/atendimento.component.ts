import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientesService } from '../clientes/clientes.service';
import { AtendimentoService } from './atendimento.service';
import { Subject, takeUntil } from 'rxjs';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.scss'],
})
export class AtendimentoComponent implements OnInit, OnDestroy {
  items: any[] = [];
  clientDetails:any;
  selectedItem: any;
  dadosAtendimento: any;
  cd_cliente: any;
  contatoCliente:any;

  atendimentoDialog:boolean = false
  finalizarAtendimentoDialog:boolean = false
  
  private destroy$: Subject<void> = new Subject<void>();

  suggestions: any[] = [];

  constructor(
    private clientsService: ClientesService,
    private atendimentoService:AtendimentoService
    ) {}

  search(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.items as any[]).length; i++) {
      let client = (this.items as any[])[i];
      if (client.nm_cliente.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          this.clientDetails = client
        filtered.push(client.nm_cliente + ' - ' + client.bairro);
      }
    }

    this.suggestions = filtered;
  }

  getClients() {
    this.clientsService.getClients().subscribe({
      next: (res: any) => {
        const { data } = res;
        this.items = data;
      },
    });
  }

  finalizarAtendimento(atendimento:any){
    this.finalizarAtendimentoDialog = true

  }


  newAtendimento(atendimento:any){
    
    console.log('atendimento', atendimento.dadosServicos)
    
    this.atendimentoDialog = true
  }

  openDialogDetails(atendimento:any){
    console.log('aqui')
  }

  deletarAtendimento(atendimento:any){
    const { nr_atendimento,  } = atendimento
    console.log('agend', atendimento)
  }


  onSelectedItemChange(newValue: any) {
    const { cd_cliente } = this.clientDetails
    this.atendimentoService.atendimentosAgendamento(cd_cliente)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res:any) => {
        const { data } = res 
        const { cd_cliente, contato } = data[0].dadosAtendimento.dadosCLiente[0]


        this.dadosAtendimento  = data
        this.cd_cliente     = cd_cliente
        this.contatoCliente = contato
      }, error: (res:any) => {
        this.dadosAtendimento = []
      }
    })

  }

  limparPesquisa(){
   this.dadosAtendimento = ""
   this.clientDetails = ""
   this.selectedItem = ""
  }


  onDialogClosed(){
    this.atendimentoDialog = false;
    this.finalizarAtendimentoDialog = false
  }

  ngOnInit(): void {
    this.getClients();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

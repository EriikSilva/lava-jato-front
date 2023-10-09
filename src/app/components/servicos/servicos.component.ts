import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientesService } from '../clientes/clientes.service';
import { ServicosService } from './servicos.service';
import { Subject, takeUntil } from 'rxjs';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss'],
})
export class ServicosComponent implements OnInit, OnDestroy {
  items: any[] = [];
  clientDetails:any;
  selectedItem: any;
  dadosServicos: any;
  cd_cliente: any;
  contatoCliente:any

  atendimentoDialog:boolean = false

  private destroy$: Subject<void> = new Subject<void>();

  suggestions: any[] = [];

  constructor(
    private clientsService: ClientesService,
    private servicosService:ServicosService
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


  newAtendimento(){
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
    this.servicosService.atendimentosAgendamento(cd_cliente)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res:any) => {
        const { data } = res 
        const { cd_cliente, contato } = data[0].dadosAtendimento.dadosCLiente[0]


        this.dadosServicos  = data
        this.cd_cliente     = cd_cliente
        this.contatoCliente = contato
      }, error: (res:any) => {
        this.dadosServicos = []
      }
    })

  }

  limparPesquisa(){
   this.dadosServicos = ""
   this.clientDetails = ""
   this.selectedItem = ""
  }


  onDialogClosed(){
    this.atendimentoDialog = false;
  }

  ngOnInit(): void {
    this.getClients();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

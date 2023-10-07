import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../clientes/clientes.service';
import { ServicosService } from './servicos.service';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss'],
})
export class ServicosComponent implements OnInit {
  items: any[] = [];
  clientDetails:any;
  selectedItem: any;
  dadosServicos: any;

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


  onSelectedItemChange(newValue: any) {
    const { cd_cliente } = this.clientDetails
    //FAZER TODO O RESTO
    this.servicosService.atendimentosAgendamento(cd_cliente)
    .subscribe({
      next: (res:any) => {
        this.dadosServicos = res.data
        console.log('res',  this.dadosServicos )
      }
    })

  }

  limparPesquisa(){
   this.dadosServicos = []
   this.dadosServicos = false
  }

  ngOnInit(): void {
    this.getClients();
  }
}

import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../clientes/clientes.service';

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

  suggestions: any[] = [];

  constructor(private clientsService: ClientesService) {}

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
  }
  ngOnInit(): void {
    this.getClients();
  }
}

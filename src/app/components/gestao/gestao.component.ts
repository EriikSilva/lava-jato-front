import { Component, OnDestroy, ViewChild } from '@angular/core';
import { TiposPagamentoComponent } from './pages/tipos-pagamento/tipos-pagamento.component';
import { VeiculosComponent } from './pages/veiculos/veiculos.component';
import { ServicosComponent } from './pages/servicos/servicos.component';

@Component({
  selector: 'app-gestao',
  templateUrl: './gestao.component.html',
  styleUrls: ['./gestao.component.scss'],
})
export class GestaoComponent {
  
  @ViewChild('TiposPagamentoComponent') TiposPagamentoComponent:TiposPagamentoComponent | undefined;
  @ViewChild('ServicosComponent') ServicosComponent:ServicosComponent | undefined;
  @ViewChild('VeiculosComponent') VeiculosComponent:VeiculosComponent | undefined;

  selectedTabIndex = 0; // Índice inicial

  onTabChange(event: any) {
    this.selectedTabIndex = event.index;

    this.fazerRequisicao();
  }

  fazerRequisicao() {
    // Lógica para fazer a requisição com base na tab selecionada
    switch (this.selectedTabIndex) {
      case 0:
         this.ServicosComponent?.getServicos();
        break;
      case 1:
          this.TiposPagamentoComponent?.getTiposPagamento();
        break;
      case 2:
        this.VeiculosComponent?.getVeiculos();
        break;
      default:
        break;
    }
  }

}

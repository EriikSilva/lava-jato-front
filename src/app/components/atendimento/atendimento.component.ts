import { PagamentoComponent } from './dialogs/pagamento/pagamento.component';
import { GestaoService } from './../gestao/gestao.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ClientesService } from '../clientes/clientes.service';
import { AtendimentoService } from './atendimento.service';
import { Subject, takeUntil } from 'rxjs';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AtendimentoDTO } from './DTO/atendimentoDTO';
import { VisualizarServicoComponent } from './dialogs/visualizar-servico/visualizar-servico.component';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class AtendimentoComponent implements OnInit, OnDestroy {
  @ViewChild('dt') dt: Table | undefined;
  @ViewChild('VisualizarServicoComponent') VisualizarServicoComponent: VisualizarServicoComponent | undefined;
  @ViewChild('PagamentoComponent') PagamentoComponent:PagamentoComponent | undefined


  items: any[] = []; //clientes
  nrAtendimento:number = 0;

  atendimentos: AtendimentoDTO[] = [];

  atendimentoDialog: boolean = false;
  finalizarAtendimentoDialog: boolean = false;
  visualizarServicoDialog: boolean = false;
  isLoading: boolean = false
  requisicaoCompleta: boolean = false
  chamarModalPagamento:boolean = false

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private clientsService: ClientesService,
    private atendimentoService: AtendimentoService,
  ) {}

  getAtendimentos() {
    this.requisicaoCompleta = false
    this.isLoading = true
    this.atendimentoService.getAtendimentosAgendamentos()
    .subscribe({
      next: (res: any) => {
        setTimeout(() => {
          this.isLoading = false;
          this.requisicaoCompleta = true
        },1000)
        const { data } = res;
        this.atendimentos = data;
      },
      error: (error: any) => {
        this.isLoading = false
      },
    });
  }

  getClients() {
    this.isLoading = true
    this.requisicaoCompleta = false
    this.clientsService.getClients()
    .subscribe({
      next: (res: any) => {
        const { data } = res;
        this.items = data;
      },
    });
  }

  newAtendimento() {
    this.atendimentoDialog = true;
  }

  visualizarServicos(atendimento: AtendimentoDTO) {
    const { cd_cliente, nr_atendimento } = atendimento
    this.visualizarServicoDialog = true
    this.VisualizarServicoComponent?.getServicosByClient(String(cd_cliente), nr_atendimento)
  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  chamarPopUp(atendimento:any){
    this.chamarModalPagamento = true;
    this.PagamentoComponent?.getPagamentoByClient(atendimento)    
  }

  onDialogClosed() {
    this.atendimentoDialog = false;
    this.finalizarAtendimentoDialog = false;
    this.visualizarServicoDialog = false
    this.chamarModalPagamento = false
  }

  
  ngOnInit(): void {
    this.getClients();
    this.getAtendimentos();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

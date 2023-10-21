import { ServicosService } from 'src/app/components/servicos/servicos.service';
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


  items: any[] = [];
  clientDetails: any;
  selectedItem: any;
  dadosAtendimento: any;
  cd_cliente: any;
  contatoCliente: any;

  atendimentos: any;

  atendimentoDialog: boolean = false;
  finalizarAtendimentoDialog: boolean = false;
  visualizarServicoDialog: boolean = false;

  private destroy$: Subject<void> = new Subject<void>();

  suggestions: any[] = [];

  constructor(
    private clientsService: ClientesService,
    private atendimentoService: AtendimentoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private ServicosService: ServicosService
  ) {}

  // search(event: AutoCompleteCompleteEvent) {
  //   let filtered: any[] = [];
  //   let query = event.query;

  //   for (let i = 0; i < (this.items as any[]).length; i++) {
  //     let client = (this.items as any[])[i];
  //     if (client.nm_cliente.toLowerCase().indexOf(query.toLowerCase()) == 0) {
  //         this.clientDetails = client
  //       filtered.push(client.nm_cliente + ' - ' + client.bairro);
  //     }
  //   }

  //   this.suggestions = filtered;
  // }

  getAtendimentos() {
    this.atendimentoService.getAtendimentosAgendamentos().subscribe({
      next: (res: any) => {
        const { data } = res;
        this.atendimentos = data;
      },
      error: (error: any) => {},
    });
  }

  getClients() {
    this.clientsService.getClients().subscribe({
      next: (res: any) => {
        const { data } = res;
        this.items = data;
      },
    });
  }

  finalizarAtendimento(atendimento: any) {
    // this.finalizarAtendimentoDialog = true
    const nr_atendimento = atendimento.dadosAtendimento.nr_atendimento;
    const nr_servico =
      atendimento.dadosAtendimento.dadosServico[0].nr_servico_atendimento;

    this.confirmationService.confirm({
      message: 'Deseja Finalizar Esse Atendimento?',
      header: 'Atenção',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.finalizarServico(nr_atendimento, nr_servico);
        // this.finalizarAtendimento2(nr_atendimento, nr_servico)
      },
    });
  }

  finalizarServico(nr_atendimento_p: number, nr_servico_p: number) {
    this.ServicosService.finalizarServico(
      nr_atendimento_p,
      nr_servico_p
    ).subscribe({
      next: (res: any) => {
        const { message } = res;
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: message,
        });

        this.finalizarAtendimento2(nr_atendimento_p, nr_servico_p);
      },
      error: (res: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao Finalizar Serviço',
          detail: res.error.error,
        });
      },
    });
  }

  finalizarAtendimento2(nr_atendimento: number, nr_servico: number) {
    this.atendimentoService
      .finalizarAtendimento(nr_atendimento, nr_servico)
      .subscribe({
        next: (res: any) => {
          console.log(res);
        },
        error: (res: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao Finalizar Atendimento',
            detail: res.error.error,
          });
        },
      });
  }
  newAtendimento() {
    this.atendimentoDialog = true;
  }

  visualizarServicos(atendimento: AtendimentoDTO) {
    const { cd_cliente, nr_atendimento } = atendimento
    this.visualizarServicoDialog = true
    this.cd_cliente =  cd_cliente
    this.VisualizarServicoComponent?.getServicosByClient(this.cd_cliente, nr_atendimento)
  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  limparPesquisa() {
    this.dadosAtendimento = '';
    this.clientDetails = '';
    this.selectedItem = '';
  }

  onDialogClosed() {
    this.atendimentoDialog = false;
    this.finalizarAtendimentoDialog = false;
    this.visualizarServicoDialog = false
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

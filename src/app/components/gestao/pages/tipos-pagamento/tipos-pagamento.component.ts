import { TiposPagamentoService } from './tipos-pagamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { PostTipoPagamento, PutTipoPagamento } from '../../DTO/servicos.DTO';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-tipos-pagamento',
  templateUrl: './tipos-pagamento.component.html',
  styleUrls: ['./tipos-pagamento.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class TiposPagamentoComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;

  tiposPagamento: [] = [];
  progressSpinner: boolean = false;
  buttonLoading: boolean = false;
  saveButton: boolean = true;
  editButton: boolean = false;
  parcelas_p: number = 0;
  selectedParcela: any;
  cd_pagamento: number = 0;

  parcelas = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
  ];

  constructor(
    private tiposPagamentoService: TiposPagamentoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  newTipoPagamentoForm = new FormGroup({
    descricao: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    qtd_parcelas: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    // this.getTiposPagamento();
  }

  getTiposPagamento() {
    if(this.tiposPagamento.length > 1){
      this.progressSpinner = false
    }else {
      this.progressSpinner = true;
    }

    this.tiposPagamentoService.getTiposPagamento().subscribe({
      next: (res: any) => {
        this.progressSpinner = false;
        const { data } = res;
        this.tiposPagamento = data;
      },
    });
  }

  salvarTipoPagamento() {
    const formValue = this.newTipoPagamentoForm.value;
    const descricao = String(formValue.descricao);

    const body: PostTipoPagamento = {
      descricao,
      qtd_parcelas: this.parcelas_p,
    };
    this.buttonLoading = true;

    this.tiposPagamentoService.postTiposPagamento(body).subscribe({
      next: (res: any) => {
        const { message } = res;
        this.buttonLoading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso ao cadastrar',
          detail: message,
        });
        this.modo();
        this.getTiposPagamento();
      },
      error: (res: any) => {
        this.buttonLoading = false;
        const { error } = res.error;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao cadastrar',
          detail: error,
        });
      },
    });
  }

  editMode(tipo_pagamento: any) {
    const { cd_pagamento, descricao, qtd_parcelas } = tipo_pagamento;

    this.saveButton = false;
    this.editButton = true;

    this.newTipoPagamentoForm.get('descricao')?.setValue(descricao);
    this.selectedParcela = this.parcelas.find(
      (parcela) => parcela.value === qtd_parcelas
    );
    this.cd_pagamento = cd_pagamento;
  }

  editarTipoPagamento() {
    const formValue = this.newTipoPagamentoForm.value;
    const descricao = String(formValue.descricao);

    const body: PutTipoPagamento = {
      cd_pagamento: Number(this.cd_pagamento),
      descricao,
      qtd_parcelas: this.selectedParcela.value,
    };

    this.buttonLoading = true;
    this.tiposPagamentoService.putTiposPagamento(body)
    .subscribe({
      next: (res: any) => {
        const { message } = res;
        this.buttonLoading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso ao Editar',
          detail: message,
        });
        this.modo();
        this.getTiposPagamento();
      },
      error: (res: any) => {
        this.buttonLoading = false;
        const { error } = res.error;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao Editar',
          detail: error,
        });
      },
    });
  }


  deletarTipoPagamento(event: Event, tipo_pagamento: any){
    const { cd_pagamento } = tipo_pagamento

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja excluir este tipo de pagamento?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.tiposPagamentoService.deleteTipoPagamento(cd_pagamento).
        subscribe({
          next: (res: any) => {
            const { message } = res;
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso ao deletar',
              detail: message,
            });
            this.getTiposPagamento();
            this.modo();
          },
          error: (res: any) => {
            const { error } = res.error
            this.messageService.add({
              severity: 'error',
              summary: 'Error ao deletar',
              detail: error,
            });
          },
        });
      },
    });
  }

  modo() {
    this.editButton = false;
    this.saveButton = true;
    this.newTipoPagamentoForm.reset();
  }

  onDropdownChangeParcelas(event: any) {
    const { value } = event;
    this.parcelas_p = Number(value.label);
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}

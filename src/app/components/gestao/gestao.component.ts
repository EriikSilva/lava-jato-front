import { GestaoService } from './gestao.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-servicos',
  templateUrl: './gestao.component.html',
  styleUrls: ['./gestao.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class GestaoComponent implements OnInit {
  servicos: any;
  progressSpinner: boolean = false;
  buttonLoading: boolean = false;
  saveButton: boolean = true;
  editButton: boolean = false;
  cd_servico: number = 0;
  body: any;

  constructor(
    private gestaoService: GestaoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  newServicoForm = new FormGroup({
    desc_servico: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    vlr_servico: new FormControl(null, Validators.required),
  });

  ngOnInit(): void {
    this.getServicos();
  }

  getServicos() {
    this.progressSpinner = true;
    this.gestaoService.getServicos().subscribe({
      next: (res: any) => {
        this.progressSpinner = false;
        const { data } = res;
        this.servicos = data;
      },
    });
  }

  salvarServico() {
    const formValue = this.newServicoForm.value;

    const desc_servico = String(formValue.desc_servico);
    const vlr_servico = Number(formValue.vlr_servico);

    this.buttonLoading = true;

    this.gestaoService.postServicos(desc_servico, vlr_servico)
    .subscribe({
      next: (res: any) => {
        this.buttonLoading = false;
        const { message } = res;
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso ao cadastrar',
          detail: message,
        });
        this.modo()
      },
      error: (res: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
        });
        console.log('error', res);
      },
    });
  }

  editarServico() {
    const formValue = this.newServicoForm.value;

    const desc_servico = String(formValue.desc_servico);
    const vlr_servico = Number(formValue.vlr_servico);

    const body = {
      desc_servico,
      vlr_servico,
      cd_servico: this.cd_servico,
    };

    this.gestaoService.editServico(body).subscribe({
      next: (res: any) => {
        const { message } = res;
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso ao editar',
          detail: message,
        });
        this.getServicos();
        this.modo();
      },
    });
  }

  deletarServico(event: Event, servico: any) {
    const { cd_servico } = servico;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja excluir este s erviço?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.gestaoService.deleteServico(cd_servico).subscribe({
          next: (res: any) => {
            const { message } = res;
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso ao editar',
              detail: message,
            });
            this.getServicos();
          },
          error: (res: any) => {
            const { error } = res.error
            this.messageService.add({
              severity: 'error',
              summary: 'Error ao editar',
              detail: error,
            });
          },
        });
      },
    });
  }

  editMode(servico: any) {
    const { desc_servico, vlr_servico, cd_servico } = servico;
    this.cd_servico = cd_servico;
    this.saveButton = false;
    this.editButton = true;

    this.newServicoForm.get('desc_servico')?.setValue(desc_servico);
    this.newServicoForm.get('vlr_servico')?.setValue(vlr_servico);

    const bodyEdit = {
      desc_servico,
      vlr_servico,
      cd_servico,
    };

    this.body = bodyEdit;
  }

  modo() {
    this.editButton = false;
    this.saveButton = true;
    this.newServicoForm.get('desc_servico')?.setValue('');
    this.newServicoForm.get('vlr_servico')?.setValue(null);
  }
}
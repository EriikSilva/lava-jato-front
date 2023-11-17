import { ConfirmationService, MessageService } from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { VeiculosService } from './veiculos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { PostVeiculo, PutVeiculo } from '../../DTO/servicos.DTO';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class VeiculosComponent implements OnInit{

  @ViewChild('dt') dt: Table | undefined;

  veiculos:any;
  progressSpinner: boolean = false;
  buttonLoading: boolean = false;
  saveButton: boolean = true;
  editButton: boolean = false;
  cd_tipo_veiculo: number = 0

  constructor(
    private veiculoService:VeiculosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
    ){}

  ngOnInit(): void {
    // this.getVeiculos();      
  }

  newVeiculoForm = new FormGroup({
    descricao: new FormControl("", [Validators.required, Validators.minLength(2)])
  })

  getVeiculos(){
    this.progressSpinner = true;
    this.veiculoService.getVeiculos()
    .subscribe({
      next:(res:any) => {
      this.progressSpinner = false;
        const { data } = res
        this.veiculos = data
      }
    })
  }

  salvarVeiculo(){
    const formValue = this.newVeiculoForm.value;
    
    const descricao = String(formValue.descricao);

    const body:PostVeiculo = {
      descricao
    }

    this.veiculoService.postVeiculos(body)
    .subscribe({
      next:(res:any) => {
        const { message } = res
        this.buttonLoading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso ao cadastrar',
          detail: message,
        });
        this.modo();
        this.getVeiculos();
      }, error:(res:any) => {
        this.buttonLoading = false;
        const { error } = res.error;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao cadastrar',
          detail: error,
        });
      }
    })

  }
  editarVeiculo(){
    const formValue = this.newVeiculoForm.value

    const descricao = String(formValue.descricao);

    const body:PutVeiculo = {
      descricao,
      cd_tipo_veiculo:this.cd_tipo_veiculo
    }
    this.veiculoService.putVeiculo(body)
    .subscribe({
      next:(res:any) => {
        const { message } = res;
        this.buttonLoading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso ao Editar',
          detail: message,
        });
        this.modo();
        this.getVeiculos();
      },error: (res: any) => {
        this.buttonLoading = false;
        const { error } = res.error;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao Editar',
          detail: error,
        });
      },
    })
  }


  editMode(veiculo: any) {
    const { cd_tipo_veiculo, descricao } = veiculo
    
    this.saveButton = false;
    this.editButton = true;

    this.newVeiculoForm.get('descricao')?.setValue(descricao);
    this.cd_tipo_veiculo = cd_tipo_veiculo
  }

  deletarVeiculo(event: Event, veiculo: any){
    const { cd_tipo_veiculo } = veiculo
    
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja excluir este veículo?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.veiculoService.deleteVeiculo(cd_tipo_veiculo)
        .subscribe({
          next: (res: any) => {
            const { message } = res;
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso ao deletar',
              detail: message,
            });
            this.getVeiculos();
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
    this.newVeiculoForm.reset();
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

}

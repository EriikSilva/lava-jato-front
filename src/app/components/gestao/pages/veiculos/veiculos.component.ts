import { ConfirmationService, MessageService } from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { VeiculosService } from './veiculos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { PostVeiculo, PutVeiculo } from '../../DTO/servicos.DTO';
import { ServicoService } from '../servicos/servico.service';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class VeiculosComponent implements OnInit{

  @ViewChild('dt') dt: Table | undefined;

  veiculos: [] = [];
  progressSpinner: boolean = false;
  buttonLoading: boolean = false;
  saveButton: boolean = true;
  editButton: boolean = false;
  cd_tipo_veiculo: number = 0;
  servicosVeiculos:any;
  dialogVeihicleDetails:boolean = false
  VeihicleDetails:[] = [];
  veiculo = "";

  constructor(
    private veiculoService:VeiculosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private servicosService:ServicoService
    ){}

  ngOnInit(): void {
    this.getVeiculos();   
    this.getServicos();
  }

  newVeiculoForm = new FormGroup({
    descricao: new FormControl("", [Validators.required, Validators.minLength(2)]),
    cd_servico_p: new FormControl("", [Validators.required])
  })

  getServicos(){
    this.servicosService.getServicos()
    .subscribe({
      next:(res:any) => {
        const { data } = res;
        const servicosConcatenados = data.map((servico: any) => ({
          ...servico,
          desc_vlr_servico: `${servico.desc_servico} - R$ ${servico.vlr_servico.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
        }));  
        this.servicosVeiculos = servicosConcatenados
      }
    })
  }

  getVeiculos(){
    if(this.veiculos.length > 1){
      this.progressSpinner = false;
    }else{
      this.progressSpinner = true;
    }

    this.veiculoService.getVeiculos()
    .subscribe({
      next:(res:any) => {
      this.progressSpinner = false;
        const { data } = res
        this.veiculos = data
      }
    })

    this.getServicos();
  }

  salvarVeiculo(){
    const formValue = this.newVeiculoForm.value;

    const cd_servico = Array(formValue.cd_servico_p)
    const cdServicos = cd_servico.flat().map((item:any) => item.cd_servico);     

    const descricao = String(formValue.descricao);

    const body:PostVeiculo = {
      descricao
    }

    this.veiculoService.postVeiculos(body)
    .subscribe({
      next:(res:any) => {
        const { message, data } = res
        this.buttonLoading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso ao cadastrar',
          detail: message,
        });
        this.adicionarSericosVeiculo(cdServicos,data)
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


  adicionarSericosVeiculo(cd_servicos:any, cd_veiculo:any){
    this.veiculoService.postServicosVeiculos(cd_servicos,cd_veiculo)
    .subscribe({
      next:(res:any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso ao cadastrar',
          detail: "Sucesso ao editar veículo",
        });
      }, error:(err:any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao cadastrar',
          detail: err,
        });
      }
    })
  }

  editarVeiculo(){
    const formValue = this.newVeiculoForm.value

    const descricao = String(formValue.descricao);
    //FORM DA PRIMEIRA ROTA
    const body:PutVeiculo = {
      descricao,
      cd_tipo_veiculo:this.cd_tipo_veiculo
    }

    //FORM DA SEGUNDA ROTA
    const cd_servico = Array(formValue.cd_servico_p)
    const cdServicos = cd_servico.flat().map((item:any) => item.cd_servico); 

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

        this.adicionarSericosVeiculo(cdServicos,this.cd_tipo_veiculo)

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
            const { message } = res.error
            this.messageService.add({
              severity: 'error',
              summary: 'Error ao deletar',
              detail: message,
            });
          },
        });
      },
    });
  }


  getServicosVinculados(veiculo:any){
    this.dialogVeihicleDetails = true;
    const { cd_tipo_veiculo, descricao } = veiculo
    this.veiculo = descricao

    this.veiculoService.getServicosListagemByVeiculoServico(cd_tipo_veiculo)
    .subscribe({
      next:(res:any) => {
        const { data } = res
        this.VeihicleDetails = data
      }
    })
  }

  editVeiculoMultiSelect(){
    // this.veiculoService.getServicosListagemByVeiculoServico()
  }

  onMultiSelectChangeServicosVeiculos(event:any){

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

import { ConfirmationService, MessageService } from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { VeiculosService } from './veiculos.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Table } from 'primeng/table';
import { PostVeiculo } from '../../DTO/servicos.DTO';

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

  constructor(
    private veiculoService:VeiculosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
    ){}

  ngOnInit(): void {
    this.getVeiculos();      
  }

  newVeiculoForm = new FormGroup({
    descricao: new FormControl
  })

  getVeiculos(){
    this.veiculoService.getVeiculos()
    .subscribe({
      next:(res:any) => {
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

  }


  editMode(veiculo: any) {

  }

  deletarVeiculo(event: Event, veiculo: any){

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

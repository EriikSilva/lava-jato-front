import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicosService } from './servicos.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss'],
  providers: [MessageService],
})
export class ServicosComponent implements OnInit {
  servicos: any
  progressSpinner:boolean = false;
  buttonLoading:boolean = false
  saveButton:boolean = true
  editButton:boolean = false

  constructor(
    private servicosService:ServicosService,
    private messageService: MessageService){}

  newServicoForm = new FormGroup({
    desc_servico: new FormControl('', [Validators.required, Validators.minLength(3)]),
    vlr_servico:  new FormControl(null, Validators.required)
  })

  ngOnInit(): void {
    this.getServicos()
  }

  getServicos(){
    this.progressSpinner = true
    this.servicosService.getServicos()
    .subscribe({
      next:(res:any) => {
        this.progressSpinner = false
        const { data } = res
        this.servicos = data
      }
    })
  }

  salvarServico(){
    const formValue = this.newServicoForm.value

    const desc_servico = String(formValue.desc_servico);
    const vlr_servico  = Number(formValue.vlr_servico);

    this.buttonLoading = true

    this.servicosService.postServicos(desc_servico, vlr_servico)
    .subscribe({
      next:(res:any) => {
        this.buttonLoading = false
        const { message } = res
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso ao cadastrar',
          detail: message,
        });  
      }, error:(res:any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro'
        });
        console.log('error', res)
      }
    })
  }

  editarServico(){
    this.saveButton = false;
    this.editButton = true;
  } 

  modo(){
    this.editButton = false;
    this.saveButton = true
  }

  deletarServico(servico:any){
    const { cd_servico } = servico

    this.servicosService.deleteServico(cd_servico)
    .subscribe({
      next:(res:any) =>{
        console.log(res)
      }, error:(res:any) => {

      }
    })

  }

  
  
}

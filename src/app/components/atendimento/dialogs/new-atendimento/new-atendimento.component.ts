import { CarrosService } from './../../../clientes/carros.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-new-atendimento',
  templateUrl: './new-atendimento.component.html',
  styleUrls: ['./new-atendimento.component.scss']
})
export class NewAtendimentoComponent {

  constructor(private carrosService:CarrosService){}

  @Input() atendimentoDialog:boolean = false
  @Output() dialogClosed = new EventEmitter<void>();

  newAtendimentoForm:any


  
  getCarrosCliente(cd_cliente:any){
    this.carrosService.getVeiculoCliente(cd_cliente)
    .subscribe({
      next:(res:any) => {
        console.log('res',res)
      }
    })
  }


  closeDialog(){
    this.atendimentoDialog = false
    this.dialogClosed.emit();
  }
  
}

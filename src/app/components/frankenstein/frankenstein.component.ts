import { Component } from '@angular/core';

@Component({
  selector: 'app-frankenstein',
  templateUrl: './frankenstein.component.html',
  styleUrls: ['./frankenstein.component.scss']
})
export class FrankensteinComponent {


  abrirDialog: boolean = false


  openDialog(){
    this.abrirDialog = true
  }


}

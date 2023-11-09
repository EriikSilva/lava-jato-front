import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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


  questionForm:any
  tipos_pregunta = [
    {
      label: "Texto abierto",
      value: 1
    },
    {
      label: "Selección simple",
      value: 2
    },
    {
      label: "Selección múltiple",
      value: 3
    },
    {
      label: "Verdadero y Falso",
      value: 4
    },
    {
      label: "Rango",
      value: 5
    }
  ];

  constructor(  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.questionForm = new FormGroup({
      pregunta: new FormControl(''),
      tipo_de_pregunta: new FormControl(null)
    })

    this.questionForm?.valueChanges.subscribe((e:any) => {
      this.questionForm?.setValue(e, { emitEvent: false });
    });
  }

  onSubmit() {
    console.log(this.questionForm?.value);
  }


}

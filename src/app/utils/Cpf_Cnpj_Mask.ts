import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[cpf-cnpj-mask]'
})
export class CpfCnpjMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    let mask: string;

    if (inputValue.length <= 11) {
      mask = '000.000.000-00'; // Máscara para CPF
    } 
    else {
      mask = '00.000.000/0000-00'; // Máscara para CNPJ
    }

    let maskedValue = '';
    let maskIndex = 0;

    for (let i = 0; i < mask.length && maskIndex < inputValue.length; i++) {
      if (mask[i] === '0') {
        maskedValue += inputValue[maskIndex];
        maskIndex++;
      } else {
        maskedValue += mask[i];
      }
    }

    input.value = maskedValue;
  }
}

//REMOVE . / -
export function removerCaracteresCPF_CNPJ(texto:string) {
    return texto.replace(/[./-]/g, '');
}
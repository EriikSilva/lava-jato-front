import { Directive, ElementRef, HostListener } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
@Directive({
  selector: '[cpf-cnpj-mask]',
})
export class CpfCnpjMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    let mask: string;

    if (inputValue.length <= 11) {
      mask = '000.000.000-00'; // Máscara para CPF
    } else {
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
export function removerCaracteresCPF_CNPJ(texto: string) {
  return texto.replace(/[./-]/g, '');
}

export function removeCaracteresTelefone(texto:string) {
  // Use uma expressão regular para substituir todos os caracteres não numéricos por uma string vazia
  const numericString = texto.replace(/\D/g, '');
  return numericString;
}

export class MaskUtils {
  formatCpfCnpj(value: string): string {
    if (!value) return '';

    value = value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (value.length === 11) {
      // Formata como CPF
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (value.length === 14) {
      // Formata como CNPJ
      return value.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5'
      );
    } else {
      return value; // Retorna valor não formatado se não for CPF nem CNPJ
    }
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefoneFormat'
})
export class TelefoneFormatPipe implements PipeTransform {
  transform(value: string): string {
    // Verifica se o valor está no formato correto
    if (value && value.length === 11) {
      return `(${value.substr(0, 2)}) ${value.substr(2, 5)}-${value.substr(7)}`;
    } else {
      return value; // Retorna o valor original se não estiver no formato correto
    }
  }
}

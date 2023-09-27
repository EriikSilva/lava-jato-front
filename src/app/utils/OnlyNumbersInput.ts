import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumericInput]'
})
export class NumericInputDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Remove todos os caracteres não numéricos
    input.value = value.replace(/[^0-9]/g, '');
  }
}

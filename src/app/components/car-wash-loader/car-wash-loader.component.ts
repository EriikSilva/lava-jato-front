import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-car-wash-loader',
  templateUrl: './car-wash-loader.component.html',
  styleUrls: ['./car-wash-loader.component.scss']
})
export class CarWashLoaderComponent {

  gifOptions: string[] = [
    'assets/loading2.gif',
    'assets/loading3.gif',
    'assets/loading4.gif',
    'assets/loading5.gif',
  ];

  randomGif: string;

  constructor() {
    this.randomGif = this.randomGifSource();
  }

  private randomGifSource(): string {
    const randomIndex = Math.floor(Math.random() * this.gifOptions.length);
    return this.gifOptions[randomIndex];
  }

} 



import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDetailsComponent } from './car-details.component';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppModule } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';

describe('CarDetailsComponent', () => {
  let component: CarDetailsComponent;
  let fixture: ComponentFixture<CarDetailsComponent>;
  let http:HttpClient

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PrimengModule, HttpClientTestingModule,AppModule],
      providers: [ConfirmationService ],
      declarations: [CarDetailsComponent]
    });
    fixture = TestBed.createComponent(CarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    http    = TestBed.inject(HttpClient)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

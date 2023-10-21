import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicosComponent } from '../servicos/servicos.component';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppModule } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';

describe('ServicosComponent', () => {
  let component: ServicosComponent;
  let fixture: ComponentFixture<ServicosComponent>;
  let http:HttpClient

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PrimengModule, 
        HttpClientTestingModule,AppModule],
      declarations: [ServicosComponent]
    });
    fixture = TestBed.createComponent(ServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    http    = TestBed.inject(HttpClient)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesComponent } from './clientes.component';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppModule } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';

describe('ClientesComponent', () => {
  let component: ClientesComponent;
  let fixture: ComponentFixture<ClientesComponent>;
  let http:HttpClient

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PrimengModule, 
        HttpClientTestingModule,AppModule],
      declarations: [ClientesComponent]
    });
    fixture = TestBed.createComponent(ClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    http    = TestBed.inject(HttpClient)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

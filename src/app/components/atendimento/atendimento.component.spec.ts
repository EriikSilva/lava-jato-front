import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoComponent } from '../gestao/gestao.component';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppModule } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';

describe('ServicosComponent', () => {
  let component: GestaoComponent;
  let fixture: ComponentFixture<GestaoComponent>;
  let http:HttpClient

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PrimengModule, 
        HttpClientTestingModule,AppModule],
      declarations: [GestaoComponent]
    });
    fixture = TestBed.createComponent(GestaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    http    = TestBed.inject(HttpClient)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

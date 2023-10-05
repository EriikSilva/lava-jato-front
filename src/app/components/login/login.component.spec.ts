import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { AppModule } from 'src/app/app.module';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let http:HttpClient

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: 
      [PrimengModule, HttpClientTestingModule,AppModule],
      declarations: [ LoginComponent ]
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    http    = TestBed.inject(HttpClient)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

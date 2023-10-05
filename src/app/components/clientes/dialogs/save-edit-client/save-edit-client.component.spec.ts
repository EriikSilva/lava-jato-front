import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveEditClientComponent } from './save-edit-client.component';
import { HttpClient } from '@angular/common/http';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppModule } from 'src/app/app.module';

describe('SaveEditClientComponent', () => {
  let component: SaveEditClientComponent;
  let fixture: ComponentFixture<SaveEditClientComponent>;
  let http:HttpClient

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PrimengModule,HttpClientTestingModule,AppModule],
      declarations: [SaveEditClientComponent]
    });
    fixture = TestBed.createComponent(SaveEditClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    http    = TestBed.inject(HttpClient)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

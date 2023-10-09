import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarAtendimentoComponent } from './finalizar-atendimento.component';

describe('FinalizarAtendimentoComponent', () => {
  let component: FinalizarAtendimentoComponent;
  let fixture: ComponentFixture<FinalizarAtendimentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalizarAtendimentoComponent]
    });
    fixture = TestBed.createComponent(FinalizarAtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

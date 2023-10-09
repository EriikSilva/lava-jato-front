import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAtendimentoComponent } from './new-atendimento.component';

describe('NewAtendimentoComponent', () => {
  let component: NewAtendimentoComponent;
  let fixture: ComponentFixture<NewAtendimentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewAtendimentoComponent]
    });
    fixture = TestBed.createComponent(NewAtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposPagamentoComponent } from './tipos-pagamento.component';

describe('TiposPagamentoComponent', () => {
  let component: TiposPagamentoComponent;
  let fixture: ComponentFixture<TiposPagamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiposPagamentoComponent]
    });
    fixture = TestBed.createComponent(TiposPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

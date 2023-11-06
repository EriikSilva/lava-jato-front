import { TestBed } from '@angular/core/testing';

import { TiposPagamentoService } from './tipos-pagamento.service';

describe('TiposPagamentoService', () => {
  let service: TiposPagamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposPagamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

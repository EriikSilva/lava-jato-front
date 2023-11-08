import { TestBed } from '@angular/core/testing';

import { GestaoService } from '../gestao/gestao.service';

describe('ServicosService', () => {
  let service: GestaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

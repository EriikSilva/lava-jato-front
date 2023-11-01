import { GestaoService } from './gestao.service';
import { TestBed } from '@angular/core/testing';


describe('GestaoService', () => {
  let service: GestaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

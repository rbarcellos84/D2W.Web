import { TestBed } from '@angular/core/testing';

import { ValidacaoEstadoService } from './validacao-estado.service';

describe('ValidacaoEstadoService', () => {
  let service: ValidacaoEstadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidacaoEstadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

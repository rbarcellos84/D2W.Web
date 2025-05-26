import { TestBed } from '@angular/core/testing';

import { TarefaEstadoService } from './tarefa-estado.service';

describe('TarefaEstadoService', () => {
  let service: TarefaEstadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarefaEstadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

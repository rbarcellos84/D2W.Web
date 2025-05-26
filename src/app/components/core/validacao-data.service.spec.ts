import { TestBed } from '@angular/core/testing';

import { ValidacaoDataService } from './validacao-data.service';

describe('ValidacaoDataService', () => {
  let service: ValidacaoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidacaoDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

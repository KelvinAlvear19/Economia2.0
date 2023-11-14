import { TestBed } from '@angular/core/testing';

import { BancoReglasService } from './banco-reglas.service';

describe('BancoReglasService', () => {
  let service: BancoReglasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BancoReglasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

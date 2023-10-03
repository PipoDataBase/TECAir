import { TestBed } from '@angular/core/testing';

import { VuelosAeropuertosService } from './vuelos-aeropuertos.service';

describe('VuelosAeropuertosService', () => {
  let service: VuelosAeropuertosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VuelosAeropuertosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

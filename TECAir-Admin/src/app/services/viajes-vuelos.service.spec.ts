import { TestBed } from '@angular/core/testing';

import { ViajesVuelosService } from './viajes-vuelos.service';

describe('ViajesVuelosService', () => {
  let service: ViajesVuelosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViajesVuelosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

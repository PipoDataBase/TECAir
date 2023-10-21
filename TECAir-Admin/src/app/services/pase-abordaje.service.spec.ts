import { TestBed } from '@angular/core/testing';

import { PaseAbordajeService } from './pase-abordaje.service';

describe('PaseAbordajeService', () => {
  let service: PaseAbordajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaseAbordajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

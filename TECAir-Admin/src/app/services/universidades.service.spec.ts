import { TestBed } from '@angular/core/testing';

import { UniversidadesService } from './universidades.service';

describe('UniversidadesService', () => {
  let service: UniversidadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniversidadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

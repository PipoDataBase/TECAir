import { TestBed } from '@angular/core/testing';

import { MaletasService } from './maletas.service';

describe('MaletasService', () => {
  let service: MaletasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaletasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

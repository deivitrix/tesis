import { TestBed } from '@angular/core/testing';

import { GeneralMovilidadService } from './general-movilidad.service';

describe('GeneralMovilidadService', () => {
  let service: GeneralMovilidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralMovilidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

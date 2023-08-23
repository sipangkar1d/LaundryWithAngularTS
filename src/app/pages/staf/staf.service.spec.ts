import { TestBed } from '@angular/core/testing';

import { StafService } from './staf.service';

describe('StafService', () => {
  let service: StafService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StafService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SoftenerService } from './softener.service';

describe('SoftenerService', () => {
  let service: SoftenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoftenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

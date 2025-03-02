import { TestBed } from '@angular/core/testing';

import { BrandesService } from './brandes.service';

describe('BrandesService', () => {
  let service: BrandesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

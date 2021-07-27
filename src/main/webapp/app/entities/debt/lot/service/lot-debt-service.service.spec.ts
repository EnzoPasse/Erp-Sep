import { TestBed } from '@angular/core/testing';

import { LotDebtServiceService } from './lot-debt-service.service';

describe('LotDebtServiceService', () => {
  let service: LotDebtServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LotDebtServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

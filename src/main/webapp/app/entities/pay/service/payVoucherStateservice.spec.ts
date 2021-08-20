import { TestBed } from '@angular/core/testing';

import { PayVoucherStateService } from './payVoucherState.service';

describe('PaymentService', () => {
  let service: PayVoucherStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayVoucherStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

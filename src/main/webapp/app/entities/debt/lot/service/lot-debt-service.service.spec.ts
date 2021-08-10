import { TestBed } from '@angular/core/testing';
import { LotDebtService } from './lot-debt-service.service';

describe('LotDebtService', () => {
  let service: LotDebtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LotDebtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

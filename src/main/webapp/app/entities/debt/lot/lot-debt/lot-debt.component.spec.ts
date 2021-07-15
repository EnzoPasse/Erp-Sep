import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotDebtComponent } from './lot-debt.component';

describe('LotDebtComponent', () => {
  let component: LotDebtComponent;
  let fixture: ComponentFixture<LotDebtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LotDebtComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

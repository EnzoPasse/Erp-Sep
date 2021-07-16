import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditoEnteComponent } from './credito-ente.component';

describe('CreditoEnteComponent', () => {
  let component: CreditoEnteComponent;
  let fixture: ComponentFixture<CreditoEnteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreditoEnteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditoEnteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

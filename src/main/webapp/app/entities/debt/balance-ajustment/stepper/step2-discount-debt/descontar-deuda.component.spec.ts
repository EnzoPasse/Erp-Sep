import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescontarDeudaComponent } from './descontar-deuda.component';

describe('DescontarDeudaComponent', () => {
  let component: DescontarDeudaComponent;
  let fixture: ComponentFixture<DescontarDeudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DescontarDeudaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescontarDeudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

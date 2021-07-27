import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step1TipoOrdenComponent } from './step1-tipo-orden.component';

describe('Step1TipoOrdenComponent', () => {
  let component: Step1TipoOrdenComponent;
  let fixture: ComponentFixture<Step1TipoOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Step1TipoOrdenComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Step1TipoOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

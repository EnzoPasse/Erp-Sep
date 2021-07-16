import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarAjusteComponent } from './confirmar-ajuste.component';

describe('ConfirmarAjusteComponent', () => {
  let component: ConfirmarAjusteComponent;
  let fixture: ComponentFixture<ConfirmarAjusteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmarAjusteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarAjusteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

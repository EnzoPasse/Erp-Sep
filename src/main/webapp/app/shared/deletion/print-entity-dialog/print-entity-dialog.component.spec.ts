import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintEntityDialogComponent } from './print-entity-dialog.component';

describe('PrintEntityDialogComponent', () => {
  let component: PrintEntityDialogComponent;
  let fixture: ComponentFixture<PrintEntityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrintEntityDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintEntityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

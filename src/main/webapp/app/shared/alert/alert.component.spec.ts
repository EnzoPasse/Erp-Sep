jest.mock('app/core/util/alert.service');

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlertComponent } from './alert.component';

describe('Component Tests', () => {
  describe('Alert Component', () => {
    let comp: AlertComponent;
    let fixture: ComponentFixture<AlertComponent>;

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          declarations: [AlertComponent],
        })
          .overrideTemplate(AlertComponent, '')
          .compileComponents();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(AlertComponent);
      comp = fixture.componentInstance;
    });

    it('should create', () => {
      expect(comp).toBeTruthy();
    });
  });
});

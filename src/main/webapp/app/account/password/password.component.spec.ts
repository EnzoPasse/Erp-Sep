jest.mock('app/core/auth/account.service');

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { AccountService } from 'app/core/auth/account.service';

import { PasswordComponent } from './password.component';
import { PasswordService } from './password.service';

describe('Component Tests', () => {
  describe('PasswordComponent', () => {
    let comp: PasswordComponent;
    let fixture: ComponentFixture<PasswordComponent>;
    let service: PasswordService;

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          declarations: [PasswordComponent],
          providers: [FormBuilder, AccountService],
        })
          .overrideTemplate(PasswordComponent, '')
          .compileComponents();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(PasswordComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(PasswordService);
    });

    it('should show error if passwords do not match', () => {
      // GIVEN
      comp.changePasswordForm.patchValue({
        newPassword: 'password1',
        confirmPassword: 'password2',
      });
      // WHEN
      comp.save();
      // THEN
      expect(comp.changePasswordForm.valid).toBe(false);
    });

    it('should call Auth.changePassword when passwords match', () => {
      // GIVEN
      const passwordValues = {
        currentPassword: 'oldPassword',
        newPassword: 'myPassword',
      };

      spyOn(service, 'save').and.returnValue(of(new HttpResponse({ body: true })));

      comp.changePasswordForm.patchValue({
        currentPassword: passwordValues.currentPassword,
        newPassword: passwordValues.newPassword,
        confirmPassword: passwordValues.newPassword,
      });

      // WHEN
      comp.save();

      // THEN
      expect(service.save).toHaveBeenCalledWith(passwordValues.newPassword, passwordValues.currentPassword);
    });

    it('should set success to true upon success', () => {
      // GIVEN
      spyOn(service, 'save').and.returnValue(of(new HttpResponse({ body: true })));
      comp.changePasswordForm.patchValue({
        newPassword: 'myPassword',
        confirmPassword: 'myPassword',
      });

      // WHEN
      comp.save();

      // THEN
      expect(comp.isSaving).toBe(true);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should notify of error if change password fails', () => {
      // GIVEN
      spyOn(service, 'save').and.returnValue(throwError('ERROR'));
      comp.changePasswordForm.patchValue({
        newPassword: 'myPassword',
        confirmPassword: 'myPassword',
      });

      // WHEN
      comp.save();

      // THEN
      expect(comp.isSaving).toBe(false);
    });
  });
});

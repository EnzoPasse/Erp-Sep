import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { Account } from 'app/core/auth/account.model';
import { PasswordService } from './password.service';

@Component({
  selector: 'jhi-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent {
  @Input() user: Account | null = null;
  hide = false;

  doNotMatch = false;
  error = false;
  success = false;
  account$?: Observable<Account | null>;

  changePasswordForm = this.fb.group(
    {
      currentPsw: ['', Validators.required],
      newPsw: ['', [Validators.required, Validators.minLength(5)]],
      confirmPsw: ['', [Validators.required]],
    },
    {
      // validator: CustomValidators.MatchPassword,
    }
  );

  constructor(private passwordService: PasswordService, private fb: FormBuilder) {}

  save(): void {
    const controls = this.changePasswordForm.controls;
    if (this.changePasswordForm.invalid) {
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.error = false;
    this.success = false;
    this.doNotMatch = false;

    const newPassword = this.changePasswordForm.get(['newPsw'])!.value;
    if (newPassword !== this.changePasswordForm.get(['confirmPsw'])!.value) {
      this.doNotMatch = true;
    } else {
      this.passwordService.save(newPassword, this.changePasswordForm.get(['currentPsw'])!.value).subscribe(
        () => (this.success = true),
        () => (this.error = true)
      );
    }
  }
  get newPsw(): AbstractControl | null {
    return this.changePasswordForm.get('newPsw');
  }
  get confirmPsw(): AbstractControl | null {
    return this.changePasswordForm.get('confirmPsw');
  }
  get currentPsw(): AbstractControl | null {
    return this.changePasswordForm.get('currentPsw');
  }

  mensajeCurrentPassword(): string {
    return this.currentPsw?.hasError('required') ? 'La contraseña actual es requerida' : '';
  }

  mensajeErrorPassword(): string {
    return this.newPsw?.hasError('required')
      ? 'La nueva contraseña es requerida'
      : this.newPsw?.hasError('minlength')
      ? 'Debe tener al menos 5 caractees'
      : '';
  }

  mensajeErrorConfirmPassword(): string {
    return this.confirmPsw?.hasError('MatchPassword') ? 'Las contraseñas no coinciden' : '';
  }
}

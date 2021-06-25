import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { Account } from 'app/core/auth/account.model';
import { PasswordService } from './password.service';
import { CustomValidators } from 'app/core/util/validators';

@Component({
  selector: 'jhi-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent {
  @Input() user: Account | null = null;
  hide = false;
  isSaving = false;

  changePasswordForm = this.fb.group(
    {
      currentPsw: ['', Validators.required],
      newPsw: ['', [Validators.required, Validators.minLength(5)]],
      confirmPsw: ['', [Validators.required]],
    },
    {
      validator: CustomValidators.MatchPassword,
    }
  );

  constructor(private passwordService: PasswordService, private fb: FormBuilder) {}

  save(): void {
    const controls = this.changePasswordForm.controls;
    if (this.changePasswordForm.invalid) {
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    if (this.user) {
      this.user.clave = this.currentPsw?.value;
      this.user.nuevaClave = this.newPsw?.value;

      this.passwordService.save(this.user).subscribe({
        next: () => {
          (this.isSaving = true), this.previousState();
        },
        error: () => {
          this.isSaving = false;
        },
      });
    }
  }

  previousState(): void {
    window.history.back();
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

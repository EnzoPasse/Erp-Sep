import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPassword } from './forgot.service';

@Component({
  selector: 'jhi-forgot',
  templateUrl: './forgot.component.html',
})
export class ForgotComponent {
  forgotForm = this.fb.group({
    username: [null, [Validators.required]],
  });

  constructor(private fb: FormBuilder, private router: Router, private forgotPswService: ForgotPassword) {}

  onSubmit(): void {
    this.forgotPswService.forgot(this.username?.value).subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
    });
  }

  get username(): AbstractControl | null {
    return this.forgotForm.controls['username'];
  }
}

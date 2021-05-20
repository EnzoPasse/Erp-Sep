import { Component, ViewChild, OnInit, AfterContentInit, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'app/login/login.service';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, AfterContentInit {
  @ViewChild('username', { static: false })
  username?: ElementRef;

  authenticationError = false;

  periods: any[] = [];

  loginForm = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
    periodo: [null, [Validators.required]],
    rememberMe: [false],
  });

  constructor(
    private accountService: AccountService,
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // load the accounting periods
    this.accountService.getAllPeriod().subscribe(period => (this.periods = period));

    // if already authenticated then navigate to home page
    this.accountService.identity().subscribe(() => {
      if (this.accountService.isAuthenticated()) {
        this.router.navigate(['']);
      }
    });
  }

  ngAfterContentInit(): void {
    if (this.username) {
      this.username.nativeElement.focus();
    }
  }

  login(): void {
    this.loginService
      .login({
        nombre: this.loginForm.get('username')!.value,
        clave: this.loginForm.get('password')!.value,
        idPeriodoContable: this.loginForm.get('periodo')!.value.id,
        rememberMe: this.loginForm.get('rememberMe')!.value,
      })
      .subscribe(
        () => {
          this.authenticationError = false;
          if (!this.router.getCurrentNavigation()) {
            // There were no routing during login (eg from navigationToStoredUrl)
            this.router.navigate(['']);
          }
        },
        () => (this.authenticationError = true)
      );

    //this.router.navigate(['']);
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';
import { Account } from 'app/core/auth/account.model';
import { Subscription } from 'rxjs';

import { IPeriodoContable } from 'app/shared/modelTodelete/periodoContable';

@Component({
  selector: 'jhi-header',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isNavbarCollapsed = true;
  currentAccount: Account | null = null;
  subscription: Subscription[] = [];
  periodo!: IPeriodoContable;

  constructor(private loginService: LoginService, private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    /*  this.accountService.getAuthenticationState().pipe(
      tap(cuenta => this.currentAccount = cuenta),
      switchMap(account => this.navBarService.getPeriodo(account?.id))
    ).subscribe({
      next: (periodo) => { this.periodo = periodo }
    })
 */

    this.accountService.getAuthenticationState().subscribe({
      next: cuenta => {
        this.currentAccount = cuenta;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.forEach(subs => subs.unsubscribe());
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.router.navigate(['/auth/login']);
  }

  logout(): void {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['/auth/login']);
  }

  settings(): void {
    this.router.navigate(['/cuenta/configuracion']);
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  getImageUrl(): string {
    return this.isAuthenticated() ? this.accountService.getImageUrl() : '';
  }
}

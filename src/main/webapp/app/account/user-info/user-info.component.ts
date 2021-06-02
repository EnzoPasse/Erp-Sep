import { Component, Input, OnInit } from '@angular/core';
import { Account } from 'app/core/auth/account.model';

@Component({
  selector: 'jhi-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() user: Account | null = null;

  ngOnInit(): void {
    // eslint-disable-next-line no-console
    console.log(this.user);
  }
}

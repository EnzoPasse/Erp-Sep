import { AbstractControl } from '@angular/forms';

export class CustomValidators {
  static MatchPassword(ac: AbstractControl): any {
    const psw = ac.get('newPsw')?.value;
    const confirmpsw = ac.get('confirmPsw')?.value;
    if (psw !== confirmpsw) {
      return ac.get('confirmPsw')?.setErrors({ MatchPassword: true });
    } else {
      return null;
    }
  }
}

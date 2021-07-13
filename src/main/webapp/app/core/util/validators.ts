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

  static isValidDate(control: AbstractControl): { [key: string]: boolean } | null {
    let dia = 0;
    let mes = 0;
    let anio = 0;
    if (control.value) {
      const res = control.value.split('/');
      if (res.length > 1) {
        dia = Number(res[0]);
        mes = Number(res[1]);
        anio = Number(res[2]);
      } else {
        dia = Number(control.value.substring(0, 2));
        mes = Number(control.value.substring(2, 4));
        anio = Number(control.value.substring(4, 8));
      }

      if (isNaN(dia) || isNaN(mes) || isNaN(anio)) {
        return { isValidDate: true };
      }

      if (dia < 1 || dia > 31) {
        return { isValidDate: true };
      }

      if (mes < 1 || mes > 12) {
        return { isValidDate: true };
      }

      if ((mes === 4 || mes === 6 || mes === 9 || mes === 11) && dia > 31) {
        return { isValidDate: true };
      }

      if (mes === 2 && dia > 29) {
        return { isValidDate: true };
      }

      if (anio < 1900 || anio > 2099) {
        return { isValidDate: true };
      }
    }
    return null;
  }

  static RequireMatch(control: AbstractControl): { [key: string]: boolean } | null {
    const selection: any = control.value;
    if (typeof selection === 'string' || selection === '') {
      return { incorrect: true };
    }
    return null;
  }

  static maxNumber(control: AbstractControl): { [key: string]: boolean } | null {
    if (!control.value) {
      return null;
    }

    if (control.value > 100000000) {
      return { excedido: true };
    }
    return null;
  }
}

import {AbstractControl, ValidationErrors, Validators} from "@angular/forms";

export interface RecordFields {
  key: string;
  label: string;
  value?: any;
  type: InputType;
  dropDownOptions?: any[],
  validators?: any[];
  default?: any;
  multiLang?: boolean;
  url?: string
}

export enum InputType {
  TEXT, TOGGLE, DROP_DOWN, ADVANCE_DROPDOWN
}

export class Global {
  static key_token = 'token';
  static key_refresh_token = 'refreshToken';
  static key_role = 'role';
}


export function PasswordValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value || '';
  const hasUppercase = /[A-Z]/.test(value);
  const hasLowercase = /[a-z]/.test(value);
  const hasNumber = /\d/.test(value);
  const valid = hasUppercase && hasLowercase && hasNumber;
  return valid ? null : {invalidPassword: true};
}


import { FormControl, Validators } from '@angular/forms';
import { isPhone, isCPF } from 'brazilian-values';
import * as moment from 'moment';

export class CustomValidators extends Validators {
  static validateEmail(control: FormControl) {
    if (!control.value) {
      return { 'Campo Obrigatório': true };
    }
    const regex = new RegExp(
      /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/
    );
    if (
      control.value &&
      control.value.length > 0 &&
      !regex.test(control.value)
    ) {
      return { 'O e-mail informado é inválido': true };
    }
  }

  static validateName(control: FormControl) {
    if (!control.value) {
      return { 'Campo Obrigatório': true };
    }

    control.value.trimRight();
    const regex = /^[A-Za-zÀ-ÿ &]*$/;

    if (!regex.test(control.value)) {
      return { 'Campo Obrigatório': true };
    }
  }

  static validateCellphone(control: FormControl) {
    if (!control.value) {
      return { 'Campo Obrigatório': true };
    }
    const cellphone = control.value.replace(/([.])/g, '');
    if (!isPhone(cellphone)) {
      return { 'O celular informado é inválido': true };
    }
  }

  static validateDate(control: FormControl) {
    if (!control.value) {
      return { 'Campo Obrigatório': true };
    }
    const date = moment(control.value.toString());
    if (!date.isValid()) {
      return { 'A data informada é inválida': true };
    }
  }

  static validateCPF(control: FormControl) {
    if (!control.value) {
      return { 'Campo Obrigatório': true };
    }

    if (!isCPF(control.value.trimRight())) {
      return { 'Campo Obrigatório': true };
    }
  }
}

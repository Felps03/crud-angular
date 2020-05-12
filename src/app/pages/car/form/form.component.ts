import { Component, OnInit } from '@angular/core';
import { ClientService } from '../service/client.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as mask from '../../../core/validators/masks';

import { CustomValidators } from 'src/app/core/validators/custom-validators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  id: number;
  clientsForm: FormGroup;
  validation: any;
  formStatus: string;

  constructor(
    public clientService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.clientsForm = this.formBuilder.group({
      name: ['', CustomValidators.validateName],
      cpf: ['', CustomValidators.validateCPF],
      cellphone: ['', CustomValidators.validateCellphone],
      birthday: ['', CustomValidators.validateDate],
      address: ['', CustomValidators.validateName],
      car: ['', CustomValidators.validateName],
    });
    this.getParams();
    this.validation = mask.default;
  }

  getParams() {
    this.activatedRoute.params.forEach((params: Params) => {
      this.id = params.id;
    });
    if (!isNaN(this.id)) {
      const userID = Number(this.id);
      const userData = this.clientService.getClient(userID);
      const userFormControl = this.clientsForm.controls;

      for (const key in userFormControl) {
        if (userFormControl.hasOwnProperty(key)) {
          userFormControl[key].setValue(userData[key]);
        }
      }

      this.clientsForm.updateValueAndValidity();
    }
  }

  onSubmit(form) {
    this.formStatus = this.clientsForm.status;
    if (this.formStatus === 'VALID') {
      const formValues = form.value;
      if (this.id) {
        const userData = this.clientService.listClients();
        const userID = Number(this.id);
        const allClients = Object.keys(userData).map((i) => userData[i]);

        const index = allClients.findIndex((user) => {
          return user.id === Number(userID);
        });

        const userFormControl = this.clientsForm.controls;

        for (const key in userFormControl) {
          if (userFormControl.hasOwnProperty(key)) {
            allClients[index][key] = userFormControl[key].value;
          }
        }
        this.clientService.editClient(allClients);
      } else {
        this.clientService.addClients({
          name: formValues.name,
          address: formValues.address,
          birthday: formValues.birthday,
          cpf: formValues.cpf,
          cellphone: formValues.cellphone,
          car: formValues.car,
        });
      }
      this.router.navigateByUrl('/');
    }
  }
}

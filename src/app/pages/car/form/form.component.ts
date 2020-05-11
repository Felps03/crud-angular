import { Component, OnInit } from '@angular/core';
import { ClientService } from '../service/client.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  id: number;
  clientsForm: FormGroup;
  constructor(
    public clientService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.clientsForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
        ],
      ],
      cpf: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
        ],
      ],
      cellphone: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(14),
        ],
      ],
      birthday: ['', [Validators.required]],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
        ],
      ],
      car: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
        ],
      ],
    });
    this.getParams();
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

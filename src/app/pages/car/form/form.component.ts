import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as mask from '../../../core/validators/masks';
import { DataServiceService } from '../service/data-service.service';
import { CustomValidators } from 'src/app/core/validators/custom-validators';
import { ClientService } from '../service/client.service';

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
  type: string;
  brands: any;
  models: any;
  types: any = [{ id: 'carros', name: 'Carro' } , { id: 'motos', name: 'Moto' } , { id: 'caminhoes', name: 'Caminhão' }];
  submitBtnStatus = false;

  constructor(
    public clientService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dataServiceService: DataServiceService
  ) {}

  ngOnInit() {
    this.clientsForm = this.formBuilder.group({
      name: ['', CustomValidators.validateName],
      cpf: ['', CustomValidators.validateCPF],
      cellphone: ['', CustomValidators.validateCellphone],
      birthday: ['', CustomValidators.validateDate],
      address: ['', CustomValidators.validateName],
      vehicles: ['', Validators.required],
      brands: ['', Validators.required],
      models: ['', Validators.required],
    });
    this.getParams();
    this.validation = mask.default;
    this.clientsForm.valueChanges.subscribe(() => {
      this.submitBtnStatus = false;
    });
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

  onSelectType(idType) {
    this.type = idType;
    this.getAllBrands(idType);
  }

  onSelectBrand(idBrand) {
    this.models = null;
    this.getAllModels(this.type, idBrand);
  }

  getAllBrands(type) {
    try {
      this.dataServiceService.getAllBrands(type).subscribe((data) => {
        this.brands = data;
      });
    } catch (error) {
      return error.stack;
    }
  }

  private getAllModels(type, idBrand) {
    try {
      this.dataServiceService.getAllModels(type, idBrand).subscribe((data) => {
        this.models = data.modelos;
      });
    } catch (error) {
      return error.stack;
    }
  }

  onSubmit(form) {
    this.formStatus = this.clientsForm.status;
    if (this.formStatus === 'VALID') {
      this.submitBtnStatus = false;
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
    this.submitBtnStatus = true;
  }
}

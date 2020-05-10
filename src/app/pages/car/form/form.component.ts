import { Component, OnInit } from '@angular/core';
import { ClientService } from '../service/client.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  id: number;

  constructor(
    public clientService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.activatedRoute.params.forEach((params: Params) => {
      this.id = params.id;
      if (!isNaN(this.id)) {
       this.clientService.getClient(this.id);
      }
    });
  }

  onSubmit(form) {
    this.clientService.addClients({
      name: form.value.InputName,
      andress: form.value.InputAndress,
      birthday: form.value.InputBirthday,
      cpf: form.value.InputCPF,
      cellphone: form.value.InputCellphone,
      car: form.value.InputCar
    });
    this.router.navigateByUrl('/');
  }
}

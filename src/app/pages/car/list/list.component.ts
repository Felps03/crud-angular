import { Component, OnInit } from '@angular/core';
import { ClientService } from '../service/client.service';
import { Client } from '../models/Client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  clients: Client[];
  constructor(public clientService: ClientService, private router: Router) {}

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    this.clients = this.clientService.listClients();
  }

  update(id) {
    this.router.navigate([`/form`, id]);
  }

  delete(client: Client) {
    if (confirm('Você realmente deseja deletar o usuario?')) {
      this.clientService.deleteClient(client);
    }
  }
}

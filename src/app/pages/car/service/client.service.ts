import { Injectable } from '@angular/core';
import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  clients: Client[];

  constructor() {}

  listClients() {
    if ( localStorage.getItem('clients') === null ) {
      this.clients = [];
    } else {
      this.clients = JSON.parse(localStorage.getItem('clients'));
    }
    return this.clients;
  }

  addClients(client: Client) {
    let clients = [];
    if ( localStorage.getItem('clients') === null) {
      clients.push(client);
      localStorage.setItem('clients', JSON.stringify(clients));
    } else {
      clients = JSON.parse(localStorage.getItem('clients'));
      clients.push(client);
      localStorage.setItem('clients', JSON.stringify(clients));
    }
  }

  getClient(id) {
    for (let i = 0; i < this.clients.length; i++) {
      if (id === i) {
        return this.clients[i];
      }
    }
  }

  deleteClient(client: Client) {
    for ( let i = 0; i < this.clients.length; i++ ) {
      if ( client === this.clients[i] ) {
        this.clients.splice(i, 1);
        localStorage.setItem('clients', JSON.stringify(this.clients));
      }
    }
  }
}

import { Injectable } from '@angular/core';
import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  clients: Client[];
  private nextId: number;

  constructor() {}

  listClients() {
    if (localStorage.getItem('clients') === null) {
      this.clients = [];
    } else {
      this.clients = JSON.parse(localStorage.getItem('clients'));
    }
    return this.clients;
  }

  private getNextId() {
    const clients = Object.keys(this.listClients()).map(
      (i) => this.listClients()[i]
    );

    if (clients.length === 0) {
      this.nextId = 0;
    } else {
      const currentID = clients[clients.length - 1].id;
      this.nextId = currentID + 1;
    }
  }

  addClients(clientContent: Client) {
    let clients;
    this.getNextId();

    if (localStorage.getItem('clients') === null) {
      clients = [];
    } else {
      clients = JSON.parse(localStorage.getItem('clients'));
    }

    clients.push({ id: this.nextId, ...clientContent });
    localStorage.setItem('clients', JSON.stringify(clients));
    this.nextId++;
  }

  getClient(id) {
    this.clients = JSON.parse(localStorage.getItem('clients'));
    for (const client of this.clients) {
      if (id === client.id) {
        return client;
      }
    }
  }


  editClient(updatedClient) {
    localStorage.setItem('clients', JSON.stringify(updatedClient));
  }

  deleteClient(client: Client) {
    for (let i = 0; i < this.clients.length; i++) {
      if (client === this.clients[i]) {
        this.clients.splice(i, 1);
        localStorage.setItem('clients', JSON.stringify(this.clients));
      }
    }
  }
}

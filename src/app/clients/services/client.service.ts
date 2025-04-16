import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Client } from "../models/client.model";
import { HttpClient } from "@angular/common/http";
import { baseUrl } from "../../common/helper/base-url.helper";


@Injectable({
  providedIn: "root"
})
export class ClientService {

  private readonly http = inject(HttpClient);

  private _clients = new BehaviorSubject<Client[]>([]);
  public readonly clients$ = this._clients.asObservable();


  public updateClients() {
    this.http.get<Client[]>(this.getBaseUrl())
      .subscribe(clients => this.clients = clients);
  }


  private get clients(): Client[] {
    return this._clients.getValue();
  }


  private set clients(value: Client[]) {
    this._clients.next(value);
  }


  private getBaseUrl(id?: number) {
    return `${baseUrl}/clients${id ? '/' + id : ""}`;
  }
}

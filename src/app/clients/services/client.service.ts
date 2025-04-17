import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
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


  public addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.getBaseUrl(), client)
      .pipe(
        tap(client => this.clients.push(client))
      );
  }


  public updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(this.getBaseUrl(client.id), client)
      .pipe(
        tap(updatedClient => {
          this.clients = this.clients.map(c =>
            c.id === updatedClient.id ? updatedClient : c)
        })
      );
  }


  public deleteClient(client: Client): Observable<void> {
    return this.http.delete<void>(this.getBaseUrl(client.id))
      .pipe(
        tap(() => this.clients = this.clients.filter(c => c.id !== client.id))
      );
  }


  private get clients(): Client[] {
    return this._clients.getValue();
  }


  private set clients(value: Client[]) {
    this._clients.next(value);
  }


  private getBaseUrl(id?: number) {
    return `${baseUrl}/clients${id ? "/" + id : ""}`;
  }
}

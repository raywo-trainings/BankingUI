import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Client } from "../models/client.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseUrl } from "../../common/helper/base-url.helper";
import { fullName } from "../pipes/fullName.pipe";


@Injectable({
  providedIn: "root"
})
export class ClientService {

  private readonly http = inject(HttpClient);

  private _clients = new BehaviorSubject<Client[]>([]);
  public readonly clients$ = this._clients.asObservable();


  public updateClients() {
    const headers = new HttpHeaders({
      "X-Error-Context": "Kundenliste konnte nicht geladen werden"
    });

    this.http.get<Client[]>(this.getBaseUrl(), { headers })
      .subscribe(clients => this.clients = clients);
  }


  public getClient(id: number): Observable<Client> {
    const headers = new HttpHeaders({
      "X-Error-Context": "Kunde konnte nicht geladen werden"
    });

    return this.http.get<Client>(this.getBaseUrl(id), { headers });
  }


  public addClient(client: Client): Observable<Client> {
    const headers = new HttpHeaders({
      "X-Error-Context": "Kunde konnte nicht angelegt werden"
    });

    return this.http.post<Client>(this.getBaseUrl(), client, { headers })
      .pipe(
        tap(client => this.clients.push(client))
      );
  }


  public updateClient(client: Client): Observable<Client> {
    const headers = new HttpHeaders({
      "X-Error-Context": "Kunde konnte nicht geändert werden"
    });

    return this.http.put<Client>(this.getBaseUrl(client.id), client, { headers })
      .pipe(
        tap(updatedClient => {
          this.clients = this.clients.map(c =>
            c.id === updatedClient.id ? updatedClient : c);
        })
      );
  }


  public deleteClient(client: Client): Observable<void> {
    const headers = new HttpHeaders({
      "X-Error-Context": "Kunde konnte nicht gelöscht werden"
    });

    return this.http.delete<void>(this.getBaseUrl(client.id), { headers })
      .pipe(
        tap(() => this.clients = this.clients.filter(c => c.id !== client.id))
      );
  }


  private get clients(): Client[] {
    return this._clients.getValue();
  }


  private set clients(value: Client[]) {
    const sortedClients = value.sort((a, b) => {
      return fullName(a).toLowerCase().localeCompare(fullName(b).toLowerCase());
    });
    this._clients.next(sortedClients);
  }


  private getBaseUrl(id?: number) {
    return `${baseUrl}/clients${id ? "/" + id : ""}`;
  }

}

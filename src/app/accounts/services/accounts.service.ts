import { inject, Injectable } from "@angular/core";
import { Client } from "../../clients/models/client.model";
import { BehaviorSubject, Observable } from "rxjs";
import { Account } from "../models/account.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseUrl } from "../../common/helper/base-url.helper";


@Injectable({
  providedIn: "root"
})
export class AccountsService {

  private readonly http = inject(HttpClient);

  private _accounts = new BehaviorSubject<Account[]>([]);
  public readonly accounts$ = this._accounts.asObservable();


  public updateAccounts() {
    const headers = new HttpHeaders({
      "X-Error-Context": "Kontoliste konnte nicht geladen werden"
    });

    this.http.get<Account[]>(this.getBaseUrl(), {headers})
      .subscribe(accounts => this.accounts = accounts);
  }


  public getAccountsForClient(client: Client): Observable<Account[]> {
    const headers = new HttpHeaders({
      "X-Error-Context": "Kontoliste für Kunden konnte nicht geladen werden"
    });

    return this.http.get<Account[]>(`${this.getBaseUrl()}?ownerId=${client.id}`,
      {headers});
  }


  private getBaseUrl(iban?: string) {
    return `${baseUrl}/accounts${iban ? "/" + iban : ""}`;
  }


  private get accounts(): Account[] {
    return this._accounts.getValue();
  }


  private set accounts(value: Account[]) {
    this._accounts.next(value);
  }

}

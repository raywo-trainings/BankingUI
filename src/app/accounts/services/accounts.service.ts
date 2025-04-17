import { inject, Injectable } from "@angular/core";
import { Client } from "../../clients/models/client.model";
import { Observable } from "rxjs";
import { Account } from "../models/account.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseUrl } from "../../common/helper/base-url.helper";


@Injectable({
  providedIn: "root"
})
export class AccountsService {

  private readonly http = inject(HttpClient);


  public getAccountsForClient(client: Client): Observable<Account[]> {
    const headers = new HttpHeaders({
      "X-Error-Context": "Kontoliste für Kunden konnte nicht geladen werden"
    });

    return this.http.get<Account[]>(`${this.getBaseUrl()}?ownerId=${client.id}`,
      { headers });
  }


  private getBaseUrl(iban?: string) {
    return `${baseUrl}/accounts${iban ? "/" + iban : ""}`;
  }

}

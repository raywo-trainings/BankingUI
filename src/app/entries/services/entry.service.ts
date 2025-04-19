import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Account } from "../../accounts/models/account.model";
import { Observable, of } from "rxjs";
import { Entry, EntryWriteDTO } from "../models/entry.model";
import { baseUrl } from "../../common/helper/base-url.helper";


@Injectable({
  providedIn: "root"
})
export class EntryService {

  private readonly http = inject(HttpClient);


  public getEntriesForAccount(account?: Account): Observable<Entry[]> {
    if (!account) return of([]);

    const headers = new HttpHeaders({
      "X-Error-Context": "Buchungen konnten nicht geladen werden"
    });

    return this.http.get<Entry[]>(this.getBaseUrl(account.iban!), { headers });
  }


  public deposit(account: Account, entry: EntryWriteDTO) {
    const headers = new HttpHeaders({
      "X-Error-Context": "Einzahlung konnte nicht getätigt werden"
    });

    return this.http.post<Entry>(
      this.getDepositUrl(account.iban!), entry, { headers }
    );
  }


  public withdraw(account: Account, entry: EntryWriteDTO) {
    const headers = new HttpHeaders({
      "X-Error-Context": "Auszahlung konnte nicht getätigt werden"
    });

    return this.http.post<Entry>(
      this.getWithdrawUrl(account.iban!), entry, { headers }
    );
  }


  private getBaseUrl(iban: string): string {
    return `${baseUrl}/accounts/${iban}/entries`;
  }


  private getDepositUrl(iban: string): string {
    return `${baseUrl}/accounts/${iban}/deposits`;
  }


  private getWithdrawUrl(iban: string): string {
    return `${baseUrl}/accounts/${iban}/withdrawals`;
  }

}

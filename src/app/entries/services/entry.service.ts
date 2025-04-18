import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Account } from "../../accounts/models/account.model";
import { Observable, tap } from "rxjs";
import { Entry } from "../models/entry.model";
import { baseUrl } from "../../common/helper/base-url.helper";


@Injectable({
  providedIn: "root"
})
export class EntryService {

  private readonly http = inject(HttpClient);


  public getEntriesForAccount(account: Account): Observable<Entry[]> {
    const headers = new HttpHeaders({
      "X-Error-Context": "Buchungen konnten nicht geladen werden"
    });

    return this.http.get<Entry[]>(this.getBaseUrl(account.iban!), { headers })
      .pipe(
        tap(entries => console.log(entries))
      );
  }


  private getBaseUrl(iban: string) {
    return `${baseUrl}/accounts/${iban}/entries`;
  }

}

import { inject, Injectable } from "@angular/core";
import { Client } from "../../clients/models/client.model";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Account, accountDTOFromAccount } from "../models/account.model";
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

    this.http.get<Account[]>(this.getBaseUrl(), { headers })
      .subscribe(accounts => this.accounts = accounts);
  }


  public getAccountsForClient(client: Client): Observable<Account[]> {
    const headers = new HttpHeaders({
      "X-Error-Context": "Kontoliste für Kunden konnte nicht geladen werden"
    });

    return this.http.get<Account[]>(`${this.getBaseUrl()}?ownerId=${client.id}`,
      { headers });
  }


  public addAccount(account: Account): Observable<Account> {
    const headers = new HttpHeaders({
      "X-Error-Context": "Konto konnte nicht angelegt werden"
    });

    const baseUrl = this.getBaseUrlForAccount(account);
    const acc = accountDTOFromAccount(account);

    return this.http.post<Account>(baseUrl, acc, { headers })
      .pipe(
        tap(newAccount => {
          this.accounts = this.accounts.concat(newAccount);
        })
      );
  }


  public updateAccount(account: Account): Observable<Account> {
    const headers = new HttpHeaders({
      "X-Error-Context": "Konto konnte nicht geändert werden"
    });

    const baseUrl = this.getBaseUrlForAccount(account);
    const acc = accountDTOFromAccount(account);

    return this.http.put<Account>(baseUrl, acc, { headers })
      .pipe(
        tap(updatedAccount => {
          this.accounts = this.accounts
            .map(a => a.iban === updatedAccount.iban ? updatedAccount : a);
        })
      );
  }


  public closeAccount(account: Account): Observable<void> {
    const headers = new HttpHeaders({
      "X-Error-Context": "Konto konnte nicht geschlossen werden"
    });

    const baseUrl = this.getBaseUrlForAccount(account);

    return this.http.delete<void>(baseUrl, { headers })
      .pipe(
        tap(() => {
          this.accounts = this.accounts.filter(a => a.iban !== account.iban);
        })
      );
  }


  private getBaseUrlForAccount(account: Account): string {
    switch (account.type) {
      case "current":
        return this.getCurrentAccountsBaseUrl(account.iban);
      case "savings":
        return this.getSavingsAccountsBaseUrl(account.iban);
      default:
        throw new Error("Unbekannter Kontotyp");
    }
  }


  private getBaseUrl(iban?: string) {
    return `${baseUrl}/accounts${iban ? "/" + iban : ""}`;
  }


  private getCurrentAccountsBaseUrl(iban?: string) {
    return `${baseUrl}/current-accounts${iban ? "/" + iban : ""}`;
  }


  private getSavingsAccountsBaseUrl(iban?: string) {
    return `${baseUrl}/savings-accounts${iban ? "/" + iban : ""}`;
  }


  private get accounts(): Account[] {
    return this._accounts.getValue();
  }


  private set accounts(value: Account[]) {
    const sortedAccounts = value.sort((a, b) => {
      const aAccNo = a.iban!.substring(12);
      const bAccNo = b.iban!.substring(12);

      return aAccNo.localeCompare(bAccNo);
    });
    this._accounts.next(sortedAccounts);
  }

}

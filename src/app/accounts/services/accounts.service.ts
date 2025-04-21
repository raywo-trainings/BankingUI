import { inject, Injectable } from "@angular/core";
import { Client } from "../../clients/models/client.model";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Account, accountCompare, accountDTOFromAccount } from "../models/account.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseUrl } from "../../common/helper/base-url.helper";


type ClientAccountsMap = Record<number, BehaviorSubject<Account[]>>

@Injectable({
  providedIn: "root"
})
export class AccountsService {

  private readonly http = inject(HttpClient);

  private _accounts = new BehaviorSubject<Account[]>([]);
  public readonly accounts$ = this._accounts.asObservable();

  private _clientAccountsMap: ClientAccountsMap = {};


  public updateAccounts() {
    const headers = new HttpHeaders({
      "X-Error-Context": "Kontoliste konnte nicht geladen werden"
    });

    this.http.get<Account[]>(this.getBaseUrl(), { headers })
      .subscribe(accounts => {
        this.accounts = accounts;

        accounts.forEach(a => {
          if (this.clientsAccountsExists(a.owner.id!)) {
            this.setClientsAccounts(
              a.owner.id!,
              this.accounts
                .filter(a => a.owner.id === a.owner.id)
                .sort(accountCompare)
            );
          }
        });
      });
  }


  public getAccountsForClient(client: Client): Observable<Account[]> {
    const headers = new HttpHeaders({
      "X-Error-Context": "Kontoliste für Kunden konnte nicht geladen werden"
    });

    this.http.get<Account[]>(
      `${this.getBaseUrl()}?ownerId=${client.id}`,
      { headers }
    )
      .pipe(
        tap(accounts => this.setClientsAccounts(client.id!, accounts))
      )
      .subscribe();

    return this.getOrCreateClientsAccounts(client.id!)?.asObservable();
  }


  public getAccount(iban: string): Observable<Account> {
    const headers = new HttpHeaders({
      "X-Error-Context": "Konto konnte nicht geladen werden"
    });

    return this.http.get<Account>(`${this.getBaseUrl(iban)}`, { headers })
      .pipe(
        tap(account => {
          if (this.clientsAccountsExists(account.owner.id!)) {
            this.setClientsAccounts(
              account.owner.id!,
              this.getOrCreateClientsAccounts(account.owner.id!)
                .getValue()
                .map(a => a.iban === account.iban ? account : a)
            );
          }
        })
      );
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

          if (this.clientsAccountsExists(account.owner.id!)) {
            this.setClientsAccounts(
              account.owner.id!,
              this.accounts
                .filter(a => a.owner.id === account.owner.id)
                .sort(accountCompare)
            );
          }
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

          const ownerId = updatedAccount.owner.id!;

          if (this.clientsAccountsExists(ownerId)) {
            this.setClientsAccounts(
              ownerId,
              this.accounts
                .filter(a => a.owner.id === ownerId)
                .sort(accountCompare)
            );
          }

          this.removeFromClientAccounts(account);
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
          this.removeFromClientAccounts(account);
        })
      );
  }


  public clearClientAccounts(clientId: number) {
    delete this._clientAccountsMap[clientId];
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
    this._accounts.next(value.sort(accountCompare));
  }


  private clientsAccountsExists(clientId: number): boolean {
    return this._clientAccountsMap[clientId] !== undefined;
  }


  private getOrCreateClientsAccounts(clientId: number): BehaviorSubject<Account[]> {
    this._clientAccountsMap[clientId] ??= new BehaviorSubject<Account[]>([]);

    return this._clientAccountsMap[clientId];
  }


  private setClientsAccounts(clientId: number, accounts: Account[]) {
    this.getOrCreateClientsAccounts(clientId)
      .next(accounts.sort(accountCompare));
  }


  private removeFromClientAccounts(account: Account) {
    Object.values(this._clientAccountsMap).forEach(accSubject => {
      accSubject.next(
        accSubject.getValue()
          .filter(a => a.iban !== account.iban)
          .sort(accountCompare)
      );
    });
  }
}

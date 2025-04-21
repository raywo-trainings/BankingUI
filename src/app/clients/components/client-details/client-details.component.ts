import { Component, effect, inject, input, OnDestroy, OnInit } from "@angular/core";
import { FullNamePipe } from "../../pipes/fullName.pipe";
import { ClientService } from "../../services/client.service";
import { Subscription, switchMap } from "rxjs";
import { Client } from "../../models/client.model";
import { AccountsService } from "../../../accounts/services/accounts.service";
import { Account } from "../../../accounts/models/account.model";
import { CurrencyPipe, Location } from "@angular/common";
import { AccountListComponent } from "../../../accounts/components/account-list/account-list.component";
import { ClientEditButtonComponent } from "../client-edit-button/client-edit-button.component";
import { ClientDeleteButtonComponent } from "../client-delete-button/client-delete-button.component";


@Component({
  selector: "app-client-details",
  imports: [
    FullNamePipe,
    CurrencyPipe,
    AccountListComponent,
    ClientEditButtonComponent,
    ClientDeleteButtonComponent
  ],
  templateUrl: "./client-details.component.html"
})
export class ClientDetailsComponent implements OnInit, OnDestroy {

  private readonly clientService = inject(ClientService);
  private readonly accountService = inject(AccountsService);
  private readonly location = inject(Location);

  private subscriptions: Subscription[] = [];

  protected client?: Client;
  protected clientAccounts: Account[] = [];
  protected netWorth = 0;
  protected accountCount = 0;

  public id = input.required<number>();


  constructor() {
    effect(() => {
      const id = this.id();

      this.subscriptions.push(
        this.clientService.getClient(id)
          .pipe(
            switchMap(client => {
              this.client = client;

              return this.accountService.getAccountsForClient(client);
            })
          )
          .subscribe(accounts => {
            this.clientAccounts = accounts;
            this.accountCount = accounts.length;
            this.netWorth = accounts.reduce((sum, account) => {
              return sum + account.balance;
            }, 0);
          })
      );
    });
  }


  public ngOnInit() {
    this.clientService.updateClients();
    this.accountService.updateAccounts();
  }


  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.accountService.clearClientAccounts(this.id());
  }


  protected onClientDeleted() {
    this.location.back();
  }
}

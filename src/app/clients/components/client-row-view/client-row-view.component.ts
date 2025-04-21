import { Component, effect, inject, model, OnDestroy } from "@angular/core";
import { Client } from "../../models/client.model";
import { Account } from "../../../accounts/models/account.model";
import { AccountsService } from "../../../accounts/services/accounts.service";
import { Subscription } from "rxjs";
import { CurrencyPipe } from "@angular/common";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FullNamePipe } from "../../pipes/fullName.pipe";
import { ClientEditButtonComponent } from "../client-edit-button/client-edit-button.component";
import { ClientDeleteButtonComponent } from "../client-delete-button/client-delete-button.component";


@Component({
  selector: "app-client-row-view",
  imports: [
    CurrencyPipe,
    FaIconComponent,
    FullNamePipe,
    ClientEditButtonComponent,
    ClientDeleteButtonComponent
  ],
  templateUrl: "./client-row-view.component.html"
})
export class ClientRowViewComponent implements OnDestroy {

  private accountService = inject(AccountsService);

  private subscriptions: Subscription[] = [];

  protected clientAccounts: Account[] = [];
  protected netWorth = 0;
  protected accountCount = 0;

  protected readonly faChevronDown = faChevronDown;

  public client = model.required<Client>();


  constructor() {
    effect(() => {
      const client = this.client();

      this.subscriptions.push(
        this.accountService.getAccountsForClient(client)
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


  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}

import { Component, effect, inject, input, OnDestroy } from "@angular/core";
import { Account } from "../../models/account.model";
import { AccountsService } from "../../services/accounts.service";
import { FullNamePipe } from "../../../clients/pipes/fullName.pipe";
import { Observable, Subscription } from "rxjs";
import { Entry } from "../../../entries/models/entry.model";
import { EntryService } from "../../../entries/services/entry.service";
import { CurrencyPipe, DecimalPipe } from "@angular/common";
import { IbanPipe } from "../../pipes/iban.pipe";
import { EntryListComponent } from "../../../entries/components/entry-list/entry-list.component";
import { isCurrentAccount } from "../../models/current-account.model";
import { isSavingsAccount } from "../../models/savings-account.model";
import { EditAccountButtonComponent } from "../edit-account-button/edit-account-button.component";


@Component({
  selector: "app-account-details",
  imports: [
    FullNamePipe,
    IbanPipe,
    CurrencyPipe,
    EntryListComponent,
    DecimalPipe,
    EditAccountButtonComponent
  ],
  templateUrl: "./account-details.component.html"
})
export class AccountDetailsComponent implements OnDestroy {

  private readonly accountService = inject(AccountsService);
  private readonly entryService = inject(EntryService);

  private readonly subscriptions: Subscription[] = [];

  protected readonly isCurrentAccount = isCurrentAccount;
  protected readonly isSavingsAccount = isSavingsAccount;

  protected account?: Account;
  protected entries$?: Observable<Entry[]>;

  public iban = input.required<string>();


  constructor() {
    effect(() => {
      const iban = this.iban();

      this.subscriptions.push(
        this.accountService.getAccount(iban)
          .subscribe(account => {
            this.account = account;
            this.entries$ = this.entryService.getEntriesForAccount(account);
          })
      );
    });
  }


  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  protected onAccountUpdated(account: Account) {
    this.account = account;
  }
}

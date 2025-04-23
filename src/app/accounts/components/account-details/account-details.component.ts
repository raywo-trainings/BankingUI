import { Component, effect, inject, input, model, OnDestroy } from "@angular/core";
import { Account } from "../../models/account.model";
import { AccountsService } from "../../services/accounts.service";
import { FullNamePipe } from "../../../clients/pipes/fullName.pipe";
import { Observable, Subscription } from "rxjs";
import { Entry } from "../../../entries/models/entry.model";
import { EntryService } from "../../../entries/services/entry.service";
import { CurrencyPipe, DecimalPipe, Location } from "@angular/common";
import { IbanPipe } from "../../pipes/iban.pipe";
import { EntryListComponent } from "../../../entries/components/entry-list/entry-list.component";
import { isCurrentAccount } from "../../models/current-account.model";
import { isSavingsAccount } from "../../models/savings-account.model";
import { EditAccountButtonComponent } from "../edit-account-button/edit-account-button.component";
import { DeleteAccountButtonComponent } from "../delete-account-button/delete-account-button.component";
import { DepositButtonComponent } from "../../../entries/components/deposit-button/deposit-button.component";
import { WithdrawButtonComponent } from "../../../entries/components/withdraw-button/withdraw-button.component";
import { DateRangePickerComponent } from "../../../common/components/date-range-picker/date-range-picker.component";
import { DateTime } from "luxon";
import { AccountIconComponent } from "../account-icon/account-icon.component";
import { BackButtonComponent } from "../../../common/components/back-button/back-button.component";


@Component({
  selector: "app-account-details",
  imports: [
    FullNamePipe,
    IbanPipe,
    CurrencyPipe,
    EntryListComponent,
    DecimalPipe,
    EditAccountButtonComponent,
    DeleteAccountButtonComponent,
    DepositButtonComponent,
    WithdrawButtonComponent,
    DateRangePickerComponent,
    AccountIconComponent,
    BackButtonComponent
  ],
  templateUrl: "./account-details.component.html"
})
export class AccountDetailsComponent implements OnDestroy {

  private readonly accountService = inject(AccountsService);
  private readonly entryService = inject(EntryService);
  private readonly location = inject(Location);

  private readonly subscriptions: Subscription[] = [];

  protected readonly isCurrentAccount = isCurrentAccount;
  protected readonly isSavingsAccount = isSavingsAccount;

  protected account?: Account;
  protected entries$?: Observable<Entry[]>;
  protected from = model<DateTime | null>(null);
  protected to = model<DateTime | null>(null);

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


  protected onDepositSuccess(account: Account) {
    this.subscriptions.push(
      this.accountService.getAccount(account.iban!)
        .subscribe(account => {
          this.account = account;
          this.entries$ = this.entryService.getEntriesForAccount(account);
        })
    );
  }


  protected onWithdrawSuccess(account: Account) {
    this.subscriptions.push(
      this.accountService.getAccount(account.iban!)
        .subscribe(account => {
          this.account = account;
          this.entries$ = this.entryService.getEntriesForAccount(account);
        })
    );
  }


  protected onAccountDeleted() {
    this.location.back();
  }

}

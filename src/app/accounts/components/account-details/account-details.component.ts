import { Component, effect, inject, input } from "@angular/core";
import { Account } from "../../models/account.model";
import { AccountsService } from "../../services/accounts.service";
import { FullNamePipe } from "../../../clients/pipes/fullName.pipe";
import { Observable, tap } from "rxjs";
import { Entry } from "../../../entries/models/entry.model";
import { EntryService } from "../../../entries/services/entry.service";
import { AsyncPipe, CurrencyPipe, DecimalPipe } from "@angular/common";
import { IbanPipe } from "../../pipes/iban.pipe";
import { EntryListComponent } from "../../../entries/components/entry-list/entry-list.component";
import { EditButtonComponent } from "../../../common/components/edit-button/edit-button.component";
import { isCurrentAccount } from "../../models/current-account.model";
import { isSavingsAccount } from "../../models/savings-account.model";


@Component({
  selector: "app-account-details",
  imports: [
    FullNamePipe,
    AsyncPipe,
    IbanPipe,
    CurrencyPipe,
    EntryListComponent,
    EditButtonComponent,
    DecimalPipe
  ],
  templateUrl: "./account-details.component.html"
})
export class AccountDetailsComponent {

  private readonly accountService = inject(AccountsService);
  private readonly entryService = inject(EntryService);

  protected account$?: Observable<Account>;
  protected entries$?: Observable<Entry[]>;

  public iban = input.required<string>();


  constructor() {
    effect(() => {
      const iban = this.iban();

      this.account$ = this.accountService.getAccount(iban)
        .pipe(
          tap(account => {
              this.entries$ = this.entryService.getEntriesForAccount(account);
            }
          )
        );

    });
  }


  protected readonly isCurrentAccount = isCurrentAccount;
  protected readonly isSavingsAccount = isSavingsAccount;
}

import { Component, effect, inject, input } from "@angular/core";
import { Account } from "../../models/account.model";
import { AccountsService } from "../../services/accounts.service";
import { FullNamePipe } from "../../../clients/pipes/fullName.pipe";
import { Observable, tap } from "rxjs";
import { Entry } from "../../../entries/models/entry.model";
import { EntryService } from "../../../entries/services/entry.service";
import { AsyncPipe } from "@angular/common";
import { EntryRowComponent } from "../../../entries/components/entry-row/entry-row.component";


@Component({
  selector: "app-account-details",
  imports: [
    FullNamePipe,
    AsyncPipe,
    EntryRowComponent
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

}

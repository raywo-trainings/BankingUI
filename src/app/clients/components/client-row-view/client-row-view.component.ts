import { Component, effect, inject, input, OnDestroy, output } from "@angular/core";
import { Client } from "../../models/client.model";
import { DeleteButtonComponent } from "../../../common/components/delete-button/delete-button.component";
import { EditButtonComponent } from "../../../common/components/edit-button/edit-button.component";
import { Account } from "../../../accounts/models/account.model";
import { AccountsService } from "../../../accounts/services/accounts.service";
import { Subscription } from "rxjs";
import { CurrencyPipe } from "@angular/common";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FullNamePipe } from "../../pipes/fullName.pipe";


@Component({
  selector: "app-client-row-view",
  imports: [
    DeleteButtonComponent,
    EditButtonComponent,
    CurrencyPipe,
    FaIconComponent,
    FullNamePipe
  ],
  templateUrl: "./client-row-view.component.html"
})
export class ClientRowViewComponent implements OnDestroy {

  private accountService = inject(AccountsService);

  private subscriptions: Subscription[] = [];

  protected clientAccounts: Account[] = [];
  protected netWorth = 0;
  protected accountCount = 0;

  public client = input.required<Client>();
  public deleteClicked = output<Client>();
  public editClicked = output<Client>();


  constructor() {
    effect(() => {
      const client = this.client();

      this.subscriptions.push(
        this.accountService.getAccountsForClient(client)
          .subscribe(accounts => {
            this.clientAccounts = accounts;
            this.accountCount = accounts.length;
            this.netWorth = accounts.reduce((sum, account) => {
              return sum + account.balance
            }, 0);
          })
      );
    });
  }


  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  protected onDeleteConfirmed() {
    this.deleteClicked.emit(this.client());
  }


  protected onEditClick() {
    this.editClicked.emit(this.client());
  }


  protected readonly faChevronDown = faChevronDown;
}

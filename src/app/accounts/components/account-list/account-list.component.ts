import { Component, effect, inject, input, OnDestroy, OnInit, signal } from "@angular/core";
import { AccountsService } from "../../services/accounts.service";
import { AsyncPipe } from "@angular/common";
import { AddButtonComponent } from "../../../common/components/add-button/add-button.component";
import { RouterLink } from "@angular/router";
import { AccountRowViewComponent } from "../account-row-view/account-row-view.component";
import { CurrentAccountEditComponent } from "../current-account-edit/current-account-edit.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Account } from "../../models/account.model";
import { Subscription } from "rxjs";
import { createEmptyCurrentAccount } from "../../models/current-account.model";
import { SavingsAccountEditComponent } from "../savings-account-edit/savings-account-edit.component";
import { createEmptySavingsAccount } from "../../models/savings-account.model";
import { ClientService } from "../../../clients/services/client.service";
import { Client } from "../../../clients/models/client.model";


@Component({
  selector: "app-account-list",
  imports: [
    AsyncPipe,
    AddButtonComponent,
    RouterLink,
    AccountRowViewComponent
  ],
  templateUrl: "./account-list.component.html",
  styleUrl: "./account-list.component.scss"
})
export class AccountListComponent implements OnInit, OnDestroy {

  private readonly clientService = inject(ClientService);
  private readonly accountService = inject(AccountsService);
  private readonly modalService = inject(NgbModal);

  private subscriptions: Subscription[] = [];

  protected accounts$ = this.accountService.accounts$;
  protected readonly clients$ = this.clientService.clients$;

  public client = input<Client>();


  constructor() {
    effect(() => {
      const client = this.client();

      if (client) {
        this.accounts$ = this.accountService.getAccountsForClient(client);
      }
    });
  }


  public ngOnInit() {
    this.accountService.updateAccounts();
    this.clientService.updateClients();
  }


  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  protected addCurrentAccount() {
    const modalRef = this.modalService.open(CurrentAccountEditComponent);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    modalRef.componentInstance.account = signal(createEmptyCurrentAccount());
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    modalRef.componentInstance.client = signal(this.client());

    modalRef.result
      .then((account: Account) => {
        this.subscriptions.push(
          this.accountService.addAccount(account).subscribe()
        );
      })
      .catch(() => { /* Do nothing. */
      });
  }


  protected addSavingsAccount() {
    const modalRef = this.modalService.open(SavingsAccountEditComponent);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    modalRef.componentInstance.account = signal(createEmptySavingsAccount());
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    modalRef.componentInstance.client = signal(this.client());

    modalRef.result
      .then((account: Account) => {
        this.subscriptions.push(
          this.accountService.addAccount(account).subscribe()
        );
      })
      .catch(() => { /* Do nothing. */
      });
  }
}

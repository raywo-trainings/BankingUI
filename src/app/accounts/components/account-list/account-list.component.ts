import { Component, effect, inject, input, model, OnDestroy, OnInit, signal } from "@angular/core";
import { AccountsService } from "../../services/accounts.service";
import { AsyncPipe } from "@angular/common";
import { AddButtonComponent } from "../../../common/components/add-button/add-button.component";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { AccountRowViewComponent } from "../account-row-view/account-row-view.component";
import { CurrentAccountEditComponent } from "../current-account-edit/current-account-edit.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Account } from "../../models/account.model";
import { combineLatest, map, Observable, of, Subscription } from "rxjs";
import { createEmptyCurrentAccount } from "../../models/current-account.model";
import { SavingsAccountEditComponent } from "../savings-account-edit/savings-account-edit.component";
import { createEmptySavingsAccount } from "../../models/savings-account.model";
import { ClientService } from "../../../clients/services/client.service";
import { Client } from "../../../clients/models/client.model";
import { FilterInputComponent } from "../../../common/components/filter-input/filter-input.component";
import { toObservable } from "@angular/core/rxjs-interop";
import { fullName } from "../../../clients/pipes/fullName.pipe";


@Component({
  selector: "app-account-list",
  imports: [
    AsyncPipe,
    AddButtonComponent,
    RouterLink,
    AccountRowViewComponent,
    FilterInputComponent
  ],
  templateUrl: "./account-list.component.html",
  styleUrl: "./account-list.component.scss"
})
export class AccountListComponent implements OnInit, OnDestroy {

  private readonly clientService = inject(ClientService);
  private readonly accountService = inject(AccountsService);
  private readonly modalService = inject(NgbModal);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  private subscriptions: Subscription[] = [];

  protected accounts$ = this.accountService.accounts$;
  protected readonly clients$ = this.clientService.clients$;
  protected filterText = model<string>();
  protected filterText$ = toObservable(this.filterText);
  protected filteredAccounts$: Observable<Account[]> = of([]);

  public client = input<Client>();


  constructor() {
    effect(() => {
      const client = this.client();

      if (client) {
        this.accounts$ = this.accountService.getAccountsForClient(client);
      }
    });

    effect(() => {
      void this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {
          filterText: this.filterText()
        },
        queryParamsHandling: "merge"
      });
    });
  }


  public ngOnInit() {
    this.accountService.updateAccounts();
    this.clientService.updateClients();

    this.subscriptions.push(
      this.activatedRoute.queryParams
        .subscribe(params => {
          const filterText = params["filterText"] as string | null | undefined;

          if (filterText) this.filterText.set(filterText);
        })
    );

    this.filteredAccounts$ = combineLatest([this.filterText$, this.accounts$])
      .pipe(
        map(([filterText, accounts]) => {
          if (!filterText || filterText === "") return accounts;

          return accounts.filter(account => {
            const filter = filterText.toLowerCase();
            const iban = account.iban?.toLowerCase();
            const owner = fullName(account.owner).toLowerCase();

            return iban?.includes(filter) || owner.includes(filter);
          });
        })
      );
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

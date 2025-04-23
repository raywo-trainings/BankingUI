import { Component, effect, inject, input, OnDestroy, OnInit, signal } from "@angular/core";
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
import { FormsModule } from "@angular/forms";


@Component({
  selector: "app-account-list",
  imports: [
    AsyncPipe,
    AddButtonComponent,
    RouterLink,
    AccountRowViewComponent,
    FilterInputComponent,
    FormsModule
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

  private readonly subscriptions: Subscription[] = [];

  protected accounts$ = this.accountService.accounts$;
  protected filteredAccounts$: Observable<Account[]> = of([]);
  protected readonly clients$ = this.clientService.clients$;
  protected readonly filterText = signal<string>("");
  protected readonly filterText$ = toObservable(this.filterText);
  protected readonly currentAccountCheck = signal<boolean | undefined>(undefined);
  protected readonly currentAccountCheck$ = toObservable(this.currentAccountCheck);
  protected readonly savingsAccountCheck = signal<boolean | undefined>(undefined);
  protected readonly savingsAccountCheck$ = toObservable(this.savingsAccountCheck);

  public client = input<Client>();


  constructor() {
    effect(() => {
      const client = this.client();

      if (client) {
        this.accounts$ = this.accountService.getAccountsForClient(client);
      }
    });

    effect(() => {
      const filterText = this.filterText();
      const filterCurrAcc = this.currentAccountCheck();
      const filterSavingsAcc = this.savingsAccountCheck();

      // console.log(filterSavingsAcc);

      void this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {
          filterText,
          filterCurrAcc,
          filterSavingsAcc
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
          const filterCurrAcc = params["filterCurrAcc"] as boolean | undefined;
          const filterSavingsAcc = params["filterSavingsAcc"] as boolean | undefined;

          if (filterText) this.filterText.set(filterText);
          if (filterCurrAcc) this.currentAccountCheck.set(filterCurrAcc);
          if (filterSavingsAcc) this.savingsAccountCheck.set(filterSavingsAcc);
        })
    );

    this.filteredAccounts$ = combineLatest([
      this.filterText$,
      this.currentAccountCheck$,
      this.savingsAccountCheck$,
      this.accounts$
    ])
      .pipe(
        map(([filterText, currAcCheck, savingsAcCheck, accounts]) => {
          if (!currAcCheck && !savingsAcCheck && !filterText) return accounts;

          return accounts.filter(account =>
            this.filterByAccountType(account, currAcCheck ?? false, savingsAcCheck ?? false)
            && this.filterByText(account, filterText)
          );
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


  private filterByAccountType(account: Account,
                              filterCurrentAcc: boolean,
                              filterSavingsAcc: boolean): boolean {
    return (filterCurrentAcc && account.type === "current")
      || (filterSavingsAcc && account.type === "savings");
  };


  private filterByText(account: Account,
                       filterText: string | null | undefined): boolean {
    if (!filterText || filterText === "") return true;

    const filter = filterText.toLowerCase();
    const iban = account.iban?.toLowerCase();
    const owner = fullName(account.owner).toLowerCase();

    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return (iban?.includes(filter) || owner.includes(filter));
  };

}

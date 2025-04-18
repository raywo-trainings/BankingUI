import {Component, inject, input, OnDestroy, signal} from "@angular/core";
import {CurrencyPipe} from "@angular/common";
import {DeleteButtonComponent} from "../../../common/components/delete-button/delete-button.component";
import {EditButtonComponent} from "../../../common/components/edit-button/edit-button.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {Account} from "../../models/account.model";
import {faCoins} from "@fortawesome/free-solid-svg-icons";
import {faCreditCard} from "@fortawesome/free-regular-svg-icons";
import {CurrentAccountAdditionalInfoComponent} from "../current-account-additional-info/current-account-additional-info.component";
import {SavingsAccountAdditionalInfoComponent} from "../savings-account-additional-info/savings-account-additional-info.component";
import {FullNamePipe} from "../../../clients/pipes/fullName.pipe";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CurrentAccountEditComponent} from "../current-account-edit/current-account-edit.component";
import {SavingsAccountEditComponent} from "../savings-account-edit/savings-account-edit.component";
import {AccountsService} from "../../services/accounts.service";
import {Subscription} from "rxjs";
import {isCurrentAccount} from "../../models/current-account.model";
import {isSavingsAccount} from "../../models/savings-account.model";


@Component({
  selector: "app-account-row-view",
  imports: [
    CurrencyPipe,
    DeleteButtonComponent,
    EditButtonComponent,
    FaIconComponent,
    FullNamePipe,
    CurrentAccountAdditionalInfoComponent,
    SavingsAccountAdditionalInfoComponent
  ],
  templateUrl: "./account-row-view.component.html"
})
export class AccountRowViewComponent implements OnDestroy {

  private readonly accountService = inject(AccountsService);
  private readonly modalService = inject(NgbModal);

  private subscriptions: Subscription[] = [];

  protected readonly faCreditCard = faCreditCard;
  protected readonly faCoins = faCoins;
  protected readonly isCurrentAccount = isCurrentAccount;
  protected readonly isSavingsAccount = isSavingsAccount;

  public account = input.required<Account>();


  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  protected onEditClick() {
    const component = isCurrentAccount(this.account()) ?
      CurrentAccountEditComponent : SavingsAccountEditComponent;
    const modalRef = this.modalService.open(component);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    modalRef.componentInstance.account = signal(this.account());

    modalRef.result
      .then((account: Account) => {
        this.subscriptions.push(
          this.accountService.updateAccount(account).subscribe()
        );
      })
      .catch(() => { /* Do nothing. */
      })
  }


  protected onDeleteClick() {
    this.accountService.closeAccount(this.account()).subscribe();
  }

}

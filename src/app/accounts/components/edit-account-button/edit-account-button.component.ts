import {Component, inject, input, model, OnDestroy, signal} from "@angular/core";
import {AccountsService} from "../../services/accounts.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Subscription} from "rxjs";
import {Account} from "../../models/account.model";
import {CurrentAccountEditComponent} from "../current-account-edit/current-account-edit.component";
import {SavingsAccountEditComponent} from "../savings-account-edit/savings-account-edit.component";
import {isCurrentAccount} from "../../models/current-account.model";
import {isSavingsAccount} from "../../models/savings-account.model";
import {EditButtonComponent} from "../../../common/components/edit-button/edit-button.component";


@Component({
  selector: "app-edit-account-button",
  imports: [
    EditButtonComponent
  ],
  templateUrl: "./edit-account-button.component.html"
})
export class EditAccountButtonComponent implements OnDestroy {

  private readonly accountService = inject(AccountsService);
  private readonly modalService = inject(NgbModal);

  private subscriptions: Subscription[] = [];

  public account = model.required<Account>();
  public caption = input<string>("Konto bearbeiten");
  public showCaption = input<boolean>(true);


  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  protected onEditClick() {
    const component = this.editComponent(this.account());
    const modalRef = this.modalService.open(component);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    modalRef.componentInstance.account = signal(this.account());

    modalRef.result
      .then((account: Account) => {
        this.subscriptions.push(
          this.accountService.updateAccount(account)
            .subscribe((account) =>
              this.account.set(account)
            )
        );
      })
      .catch(() => { /* Do nothing. */
      });
  }


  private editComponent(account: Account): typeof CurrentAccountEditComponent | typeof SavingsAccountEditComponent {
    if (isCurrentAccount(account)) {
      return CurrentAccountEditComponent;
    }

    if (isSavingsAccount(account)) {
      return SavingsAccountEditComponent;
    }

    throw new Error("Unknown account type");
  }

}

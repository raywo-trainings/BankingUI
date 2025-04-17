import { Component, input } from "@angular/core";
import { CurrencyPipe } from "@angular/common";
import { DeleteButtonComponent } from "../../../common/components/delete-button/delete-button.component";
import { EditButtonComponent } from "../../../common/components/edit-button/edit-button.component";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { Account, isCurrentAccount, isSavingsAccount } from "../../models/account.model";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { CurrentAccountAdditionalInfoComponent } from "../current-account-additional-info/current-account-additional-info.component";
import { SavingsAccountAdditionalInfoComponent } from "../savings-account-additional-info/savings-account-additional-info.component";
import { FullNamePipe } from "../../../clients/pipes/fullName.pipe";


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
export class AccountRowViewComponent {

  protected readonly faCreditCard = faCreditCard;
  protected readonly faCoins = faCoins;
  protected readonly isCurrentAccount = isCurrentAccount;
  protected readonly isSavingsAccount = isSavingsAccount;

  public account = input.required<Account>();


  protected onEditClick() {

  }


  protected onDeleteClick() {

  }

}

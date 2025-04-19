import { Component, input } from "@angular/core";
import { CurrencyPipe } from "@angular/common";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { Account } from "../../models/account.model";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { CurrentAccountAdditionalInfoComponent } from "../current-account-additional-info/current-account-additional-info.component";
import { SavingsAccountAdditionalInfoComponent } from "../savings-account-additional-info/savings-account-additional-info.component";
import { FullNamePipe } from "../../../clients/pipes/fullName.pipe";
import { isCurrentAccount } from "../../models/current-account.model";
import { isSavingsAccount } from "../../models/savings-account.model";
import { IbanPipe } from "../../pipes/iban.pipe";
import { EditAccountButtonComponent } from "../edit-account-button/edit-account-button.component";
import { DeleteAccountButtonComponent } from "../delete-account-button/delete-account-button.component";


@Component({
  selector: "app-account-row-view",
  imports: [
    CurrencyPipe,
    FaIconComponent,
    FullNamePipe,
    CurrentAccountAdditionalInfoComponent,
    SavingsAccountAdditionalInfoComponent,
    IbanPipe,
    EditAccountButtonComponent,
    DeleteAccountButtonComponent
  ],
  templateUrl: "./account-row-view.component.html"
})
export class AccountRowViewComponent {

  protected readonly faCreditCard = faCreditCard;
  protected readonly faCoins = faCoins;
  protected readonly isCurrentAccount = isCurrentAccount;
  protected readonly isSavingsAccount = isSavingsAccount;

  public account = input.required<Account>();

}

import { Component, input } from "@angular/core";
import { CurrencyPipe } from "@angular/common";
import { Account } from "../../models/account.model";
import { CurrentAccountAdditionalInfoComponent } from "../current-account-additional-info/current-account-additional-info.component";
import { SavingsAccountAdditionalInfoComponent } from "../savings-account-additional-info/savings-account-additional-info.component";
import { FullNamePipe } from "../../../clients/pipes/fullName.pipe";
import { isCurrentAccount } from "../../models/current-account.model";
import { isSavingsAccount } from "../../models/savings-account.model";
import { IbanPipe } from "../../pipes/iban.pipe";
import { EditAccountButtonComponent } from "../edit-account-button/edit-account-button.component";
import { DeleteAccountButtonComponent } from "../delete-account-button/delete-account-button.component";
import { AccountIconComponent } from "../account-icon/account-icon.component";


@Component({
  selector: "app-account-row-view",
  imports: [
    CurrencyPipe,
    FullNamePipe,
    CurrentAccountAdditionalInfoComponent,
    SavingsAccountAdditionalInfoComponent,
    IbanPipe,
    EditAccountButtonComponent,
    DeleteAccountButtonComponent,
    AccountIconComponent
  ],
  templateUrl: "./account-row-view.component.html"
})
export class AccountRowViewComponent {

  protected readonly isCurrentAccount = isCurrentAccount;
  protected readonly isSavingsAccount = isSavingsAccount;

  public account = input.required<Account>();

}

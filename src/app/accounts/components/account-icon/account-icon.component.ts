import { Component, input } from "@angular/core";
import { Account } from "../../models/account.model";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { isSavingsAccount } from "../../models/savings-account.model";
import { isCurrentAccount } from "../../models/current-account.model";
import { faCoins } from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: "app-account-icon",
  imports: [
    FaIconComponent
  ],
  templateUrl: "./account-icon.component.html"
})
export class AccountIconComponent {

  public account = input.required<Account>();

  protected readonly isSavingsAccount = isSavingsAccount;
  protected readonly isCurrentAccount = isCurrentAccount;
  protected readonly faCreditCard = faCreditCard;
  protected readonly faCoins = faCoins;

}

import { Component, input } from "@angular/core";
import { CurrentAccount } from "../../models/account.model";
import { CurrencyPipe, DecimalPipe } from "@angular/common";


@Component({
  selector: "app-current-account-additional-info",
  imports: [
    CurrencyPipe,
    DecimalPipe
  ],
  templateUrl: "./current-account-additional-info.component.html"
})
export class CurrentAccountAdditionalInfoComponent {

  public account = input.required<CurrentAccount>();

}

import { Component, input } from "@angular/core";
import { CurrencyPipe, DecimalPipe } from "@angular/common";
import { CurrentAccount } from "../../models/current-account.model";


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

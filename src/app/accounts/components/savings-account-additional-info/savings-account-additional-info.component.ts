import { Component, input } from "@angular/core";
import { SavingsAccount } from "../../models/account.model";
import { DecimalPipe } from "@angular/common";


@Component({
  selector: "app-savings-account-additional-info",
  imports: [
    DecimalPipe
  ],
  templateUrl: "./savings-account-additional-info.component.html"
})
export class SavingsAccountAdditionalInfoComponent {

  public account = input.required<SavingsAccount>();

}

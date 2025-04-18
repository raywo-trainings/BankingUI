import { Component, input } from "@angular/core";
import { DecimalPipe } from "@angular/common";
import { SavingsAccount } from "../../models/savings-account.model";


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

import { Component, effect, input } from "@angular/core";
import { AccountType, CurrentAccount } from "../../models/account.model";
import { createEmptyClient } from "../../../clients/models/client.model";
import { FormsModule } from "@angular/forms";
import { OwnerSelectComponent } from "../owner-select/owner-select.component";
import { JsonPipe } from "@angular/common";


@Component({
  selector: "app-current-account-edit",
  imports: [
    FormsModule,
    OwnerSelectComponent,
    JsonPipe
  ],
  templateUrl: "./current-account-edit.component.html"
})
export class CurrentAccountEditComponent {

  protected iban = "";
  protected balance = 0;
  protected owner = createEmptyClient();
  protected type: AccountType = "current";
  protected overdraftLimit?: number;
  protected overdraftInterestRate?: number;

  public account = input<CurrentAccount>();


  constructor() {
    effect(() => {
      const account = this.account();

      if (!account) {
        this.iban = "";
        this.balance = 0;
        this.owner = createEmptyClient();
        this.type = "current";
        this.overdraftLimit = undefined;
        this.overdraftInterestRate = undefined;

        return;
      }

      this.iban = account.iban;
      this.balance = account.balance;
      this.owner = account.owner;
      this.type = account.type;
      this.overdraftLimit = account.overdraftLimit;
      this.overdraftInterestRate = account.overdraftInterestRate;
    });
  }


  protected isEdit(): boolean {
    return this.account() !== undefined;
  }


  protected onCancel() {

  }


  protected onSubmit() {

  }

}

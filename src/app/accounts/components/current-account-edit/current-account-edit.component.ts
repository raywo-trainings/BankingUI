import { Component, effect, inject, input } from "@angular/core";
import { AccountType } from "../../models/account.model";
import { createEmptyClient } from "../../../clients/models/client.model";
import { FormsModule } from "@angular/forms";
import { OwnerSelectComponent } from "../owner-select/owner-select.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { createEmptyCurrentAccount, CurrentAccount } from "../../models/current-account.model";


@Component({
  selector: "app-current-account-edit",
  imports: [
    FormsModule,
    OwnerSelectComponent
  ],
  templateUrl: "./current-account-edit.component.html"
})
export class CurrentAccountEditComponent {

  private readonly modal = inject(NgbActiveModal);

  protected iban?: string = "";
  protected balance = 0;
  protected owner = createEmptyClient();
  protected type: AccountType = "current";
  protected overdraftLimit?: number;
  protected overdraftInterestRate?: number;

  public account = input<CurrentAccount>(createEmptyCurrentAccount());


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
    return this.account().iban !== undefined;
  }


  protected onCancel() {
    this.modal.dismiss();
  }


  protected onSubmit() {
    const newAccount: CurrentAccount = {
      ...this.account(),
      owner: this.owner,
      overdraftInterestRate: this.overdraftInterestRate ?? 0,
      overdraftLimit: this.overdraftLimit ?? 0
    };

    this.modal.close(newAccount);
  }

}

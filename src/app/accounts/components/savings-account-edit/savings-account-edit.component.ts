import { Component, effect, inject, input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { OwnerSelectComponent } from "../owner-select/owner-select.component";
import { Client, createEmptyClient } from "../../../clients/models/client.model";
import { AccountType } from "../../models/account.model";
import { createEmptySavingsAccount, SavingsAccount } from "../../models/savings-account.model";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: "app-savings-account-edit",
  imports: [
    FormsModule,
    OwnerSelectComponent
  ],
  templateUrl: "./savings-account-edit.component.html"
})
export class SavingsAccountEditComponent {

  private readonly modal = inject(NgbActiveModal);

  protected iban?: string = "";
  protected balance = 0;
  protected owner = createEmptyClient();
  protected type: AccountType = "savings";
  protected interestRate?: number;

  public account = input<SavingsAccount>(createEmptySavingsAccount());
  public client = input<Client>();


  constructor() {
    effect(() => {
      const account = this.account();
      const client = this.client();

      if (!account) {
        this.iban = "";
        this.balance = 0;
        this.owner = client ?? createEmptyClient();
        this.type = "current";
        this.interestRate = undefined;

        return;
      }

      this.iban = account.iban;
      this.balance = account.balance;
      this.owner = client ?? account.owner;
      this.type = account.type;
      this.interestRate = account.interestRate;
    });
  }


  protected isEdit(): boolean {
    return this.account().iban !== undefined;
  }


  protected ownerSelectIsReadOnly(): boolean {
    return this.client() !== undefined;
  }


  protected onCancel() {
    this.modal.dismiss();
  }


  protected onSubmit() {
    const newAccount: SavingsAccount = {
      ...this.account(),
      owner: this.owner,
      interestRate: this.interestRate ?? 0
    };

    this.modal.close(newAccount);
  }

}

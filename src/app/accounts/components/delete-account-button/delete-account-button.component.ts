import { Component, inject, input, output } from "@angular/core";
import { DeleteButtonComponent } from "../../../common/components/delete-button/delete-button.component";
import { FullNamePipe } from "../../../clients/pipes/fullName.pipe";
import { Account } from "../../models/account.model";
import { AccountsService } from "../../services/accounts.service";
import { IbanPipe } from "../../pipes/iban.pipe";


@Component({
  selector: "app-delete-account-button",
  imports: [
    DeleteButtonComponent,
    FullNamePipe,
    IbanPipe
  ],
  templateUrl: "./delete-account-button.component.html"
})
export class DeleteAccountButtonComponent {

  private readonly accountService = inject(AccountsService);

  public account = input.required<Account>();
  public showCaption = input<boolean>(true);
  public accountDeleted = output<Account>();


  protected onDeleteClick() {
    this.accountService.closeAccount(this.account())
      .subscribe(() => this.accountDeleted.emit(this.account()));
  }

}

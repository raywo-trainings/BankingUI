import { Component, effect, inject, input, output } from "@angular/core";
import { DeleteButtonComponent } from "../../../common/components/delete-button/delete-button.component";
import { FullNamePipe } from "../../pipes/fullName.pipe";
import { Client } from "../../models/client.model";
import { ClientService } from "../../services/client.service";
import { AccountsService } from "../../../accounts/services/accounts.service";


@Component({
  selector: "app-client-delete-button",
  imports: [
    DeleteButtonComponent,
    FullNamePipe
  ],
  templateUrl: "./client-delete-button.component.html"
})
export class ClientDeleteButtonComponent {

  private readonly clientService = inject(ClientService);
  private readonly accountService = inject(AccountsService);

  protected hasAccounts = false;

  public client = input.required<Client>();
  public showCaption = input<boolean>(true);
  public clientDeleted = output<Client>();


  constructor() {
    effect(() => {
      const client = this.client();

      this.accountService.getAccountsForClient(client)
        .subscribe(accounts => {
          this.hasAccounts = accounts.length > 0;
        });
    });
  }


  protected onDeleteClick() {
    this.clientService.deleteClient(this.client())
      .subscribe(() => this.clientDeleted.emit(this.client()));
  }

}

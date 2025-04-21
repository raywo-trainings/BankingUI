import { Component, inject, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ClientService } from "../../../clients/services/client.service";
import { AsyncPipe, CurrencyPipe, NgTemplateOutlet } from "@angular/common";
import { AccountsService } from "../../../accounts/services/accounts.service";


@Component({
  selector: "app-start",
  imports: [
    RouterLink,
    AsyncPipe,
    CurrencyPipe,
    NgTemplateOutlet
  ],
  templateUrl: "./start.component.html"
})
export class StartComponent implements OnInit {

  private readonly clientService = inject(ClientService);
  private readonly accountService = inject(AccountsService);

  protected clients$ = this.clientService.clients$;
  protected accountStats$ = this.accountService.getAccountStatistics();


  public ngOnInit() {
    this.clientService.updateClients();
    this.accountService.updateAccounts();
  }

}

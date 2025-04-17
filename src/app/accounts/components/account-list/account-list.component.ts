import { Component, inject, OnInit } from "@angular/core";
import { AccountsService } from "../../services/accounts.service";
import { AsyncPipe } from "@angular/common";
import { AddButtonComponent } from "../../../common/components/add-button/add-button.component";
import { RouterLink } from "@angular/router";
import { AccountRowViewComponent } from "../account-row-view/account-row-view.component";


@Component({
  selector: "app-account-list",
  imports: [
    AsyncPipe,
    AddButtonComponent,
    RouterLink,
    AccountRowViewComponent
  ],
  templateUrl: "./account-list.component.html",
  styleUrl: "./account-list.component.scss"
})
export class AccountListComponent implements OnInit {

  private readonly accountService = inject(AccountsService);

  protected readonly accounts$ = this.accountService.accounts$;


  public ngOnInit() {
    this.accountService.updateAccounts();
  }


  protected addAccount() {

  }

}

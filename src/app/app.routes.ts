import { Routes } from "@angular/router";
import { StartComponent } from "./common/components/start/start.component";
import { ClientListComponent } from "./clients/components/client-list/client-list.component";
import { AccountListComponent } from "./accounts/components/account-list/account-list.component";
import { AccountDetailsComponent } from "./accounts/components/account-details/account-details.component";


export const routes: Routes = [
  {
    path: "",
    component: StartComponent,
    pathMatch: 'full'
  },

  {
    path: "clients",
    component: ClientListComponent,
    pathMatch: 'full'
  },

  {
    path: "accounts",
    component: AccountListComponent,
    pathMatch: 'full'
  },
  {
    path: "accounts/:iban",
    component: AccountDetailsComponent,
    pathMatch: 'full'
  },

  {
    path: "**",
    redirectTo: ""
  }
];

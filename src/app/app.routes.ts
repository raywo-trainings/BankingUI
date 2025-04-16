import {Routes} from '@angular/router';
import {StartComponent} from './start/components/start/start.component';
import {ClientListComponent} from './clients/components/client-list/client-list.component';


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
    path: "**",
    redirectTo: ""
  }
];

import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavBarComponent } from "./common/components/nav-bar/nav-bar.component";
import { ToastsContainerComponent } from "./common/components/toasts-container/toasts-container.component";
import { OnlineStatusComponent } from "./common/components/online-status/online-status.component";


@Component({
  selector: "app-root",
  imports: [
    RouterOutlet,
    NavBarComponent,
    ToastsContainerComponent,
    OnlineStatusComponent
  ],
  templateUrl: "./app.component.html"
})
export class AppComponent {
}

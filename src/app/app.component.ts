import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavBarComponent } from "./common/components/nav-bar/nav-bar.component";
import { ToastsContainerComponent } from "./common/components/toasts-container/toasts-container.component";


@Component({
  selector: "app-root",
  imports: [
    RouterOutlet,
    NavBarComponent,
    ToastsContainerComponent
  ],
  templateUrl: "./app.component.html"
})
export class AppComponent {
}

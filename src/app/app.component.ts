import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavBarComponent } from "./common/components/nav-bar/nav-bar.component";


@Component({
  selector: "app-root",
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: "./app.component.html"
})
export class AppComponent {
}

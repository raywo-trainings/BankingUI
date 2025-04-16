import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: "app-nav-bar",
  imports: [
    RouterLink,
    RouterLinkActive,
    FaIconComponent
  ],
  templateUrl: "./nav-bar.component.html"
})
export class NavBarComponent {

  protected readonly faBuildingColumns = faBuildingColumns;

}

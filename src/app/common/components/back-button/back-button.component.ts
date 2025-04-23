import { Component, HostListener, inject, input } from "@angular/core";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { NavigationService } from "../../services/navigation.service";


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "button[app-back-button]",
  imports: [
    FaIconComponent
  ],
  templateUrl: "./back-button.component.html",
  host: {
    class: "btn btn-outline-primary"
  }
})
export class BackButtonComponent {

  private readonly navigator = inject(NavigationService);

  protected readonly faArrowLeft = faArrowLeft;

  public caption = input("Zurück");
  public showCaption = input(true);


  @HostListener("click", ["$event"])
  protected async onClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    await this.navigator.back();
  }
}

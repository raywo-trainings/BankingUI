import { Component, HostListener, input, output } from "@angular/core";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "button[app-add-button]",
  imports: [
    FaIconComponent
  ],
  templateUrl: "./add-button.component.html",
  host: {
    class: "btn btn-primary"
  }
})
export class AddButtonComponent {

  protected readonly faPlus = faPlus;

  public caption = input.required<string>();
  public addClick = output();


  @HostListener("click", ["$event"])
  protected onAdd(event: MouseEvent) {
    event.stopPropagation();
    this.addClick.emit();
  }

}

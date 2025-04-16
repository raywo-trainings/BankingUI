import { Component, HostListener, input, output } from "@angular/core";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: "button[app-edit-button]",
  imports: [
    FaIconComponent
  ],
  templateUrl: "./edit-button.component.html",
  host: {
    class: "btn btn-primary"
  }
})
export class EditButtonComponent {

  protected readonly faPencil = faPencil;

  public caption = input.required<string>();
  public showCaption = input<boolean>(true);
  public editClick = output();


  @HostListener("click", ["$event"])
  protected onAdd(event: MouseEvent) {
    event.stopPropagation();
    this.editClick.emit();
  }

}

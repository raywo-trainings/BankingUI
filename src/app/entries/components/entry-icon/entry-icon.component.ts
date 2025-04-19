import { Component, HostBinding, input } from "@angular/core";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";
import { EntryType } from "../../models/entry.model";


@Component({
  selector: "i[app-entry-icon]",
  imports: [
    FaIconComponent
  ],
  templateUrl: "./entry-icon.component.html",
  host: {
    class: "entry-icon"
  }
})
export class EntryIconComponent {

  protected readonly faDownload = faDownload;
  protected readonly faUpload = faUpload;

  public entryType = input.required<EntryType>();
  public colorize = input<boolean>(true);


  @HostBinding("class")
  protected get class(): string {
    if (!this.colorize()) return "";

    switch (this.entryType()) {
      case "deposit":
        return "deposit";
      case "withdraw":
        return "withdraw";
    }
  }

}

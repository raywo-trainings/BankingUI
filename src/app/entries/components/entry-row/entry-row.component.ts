import { Component, input } from "@angular/core";
import { Entry } from "../../models/entry.model";
import { TruncatedIdPipe } from "../../pipes/truncated-id.pipe";
import { faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";
import { CurrencyPipe, DatePipe } from "@angular/common";
import { NgbTooltip } from "@ng-bootstrap/ng-bootstrap";
import { EntryIconComponent } from "../entry-icon/entry-icon.component";


@Component({
  selector: "app-entry-row",
  imports: [
    TruncatedIdPipe,
    CurrencyPipe,
    DatePipe,
    NgbTooltip,
    EntryIconComponent
  ],
  templateUrl: "./entry-row.component.html"
})
export class EntryRowComponent {

  public entry = input.required<Entry>();

  protected readonly faDownload = faDownload;
  protected readonly faUpload = faUpload;

}

import { Component, inject } from "@angular/core";
import { OnlineStatusService } from "../../services/online-status.service";
import { AsyncPipe } from "@angular/common";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faSignal, faSlash } from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: "app-online-status",
  imports: [
    AsyncPipe,
    FaIconComponent
  ],
  templateUrl: "./online-status.component.html"
})
export class OnlineStatusComponent {

  private readonly statusService = inject(OnlineStatusService);

  protected readonly status$ = this.statusService.onlineStatus$;

  protected readonly faSlash = faSlash;
  protected readonly faSignal = faSignal;

}

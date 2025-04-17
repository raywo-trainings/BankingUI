import { Component, inject } from "@angular/core";
import { ToastService } from "../../services/toast.service";
import { AsyncPipe } from "@angular/common";
import { ToastComponent } from "../toast/toast.component";


@Component({
  selector: "app-toasts-container",
  imports: [
    AsyncPipe,
    ToastComponent
  ],
  templateUrl: "./toasts-container.component.html"
})
export class ToastsContainerComponent {

  private readonly toastService = inject(ToastService);

  protected toasts$ = this.toastService.toasts$;

}

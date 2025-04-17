import { Component, inject, input, TemplateRef } from "@angular/core";
import { NgbToast } from "@ng-bootstrap/ng-bootstrap";
import { Toast } from "../../models/toast.model";
import { ToastService } from "../../services/toast.service";
import { NgTemplateOutlet } from "@angular/common";


@Component({
  selector: "app-toast",
  imports: [
    NgbToast,
    NgTemplateOutlet
  ],
  templateUrl: "./toast.component.html"
})
export class ToastComponent {

  private readonly toastService = inject(ToastService);

  public toast = input.required<Toast>();


  protected onHide(toast: Toast) {
    this.toastService.remove(toast);
  }


  protected getToastClass() {
    switch (this.toast().type) {
      case "success":
        return "bg-success text-light";
      case "error":
        return "bg-danger text-light";
      case "info":
        return "bg-info text-light";
      case "warning":
        return "bg-warning text-dark";
    }
  }


  protected messageIsTemplate() {
    return this.toast().message instanceof TemplateRef;
  }


  protected getTemplate(): TemplateRef<any> | undefined {
    if (!this.messageIsTemplate()) return undefined;

    return this.toast().message as TemplateRef<any>;
  }

}

import { Component, inject, input, model, OnDestroy, signal } from "@angular/core";
import { EditButtonComponent } from "../../../common/components/edit-button/edit-button.component";
import { ClientEditComponent } from "../client-edit/client-edit.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import { ClientService } from "../../services/client.service";
import { Client } from "../../models/client.model";


@Component({
  selector: "app-client-edit-button",
  imports: [
    EditButtonComponent
  ],
  templateUrl: "./client-edit-button.component.html"
})
export class ClientEditButtonComponent implements OnDestroy {

  private readonly clientService = inject(ClientService);
  private readonly modalService = inject(NgbModal);

  private readonly subscriptions: Subscription[] = [];

  public client = model.required<Client>();
  public caption = input<string>("Kunden bearbeiten");
  public showCaption = input<boolean>(true);


  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  protected onEditClick() {
    const modalRef = this.modalService.open(ClientEditComponent);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    modalRef.componentInstance.client = signal(this.client());

    modalRef.result
      .then((client: Client) => {
        this.subscriptions.push(
          this.clientService.updateClient(client)
            .subscribe((account) =>
              this.client.set(account)
            )
        );
      })
      .catch(() => { /* Do nothing. */
      });
  }

}

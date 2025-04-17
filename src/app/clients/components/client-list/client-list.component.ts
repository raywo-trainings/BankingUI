import { Component, inject, OnDestroy, OnInit, signal } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { AsyncPipe } from "@angular/common";
import { ClientRowViewComponent } from "../client-row-view/client-row-view.component";
import { AddButtonComponent } from "../../../common/components/add-button/add-button.component";
import { Client, createEmptyClient } from "../../models/client.model";
import { Subscription } from "rxjs";
import { ClientEditComponent } from "../client-edit/client-edit.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: "app-client-list",
  imports: [
    AsyncPipe,
    ClientRowViewComponent,
    AddButtonComponent
  ],
  templateUrl: "./client-list.component.html"
})
export class ClientListComponent implements OnInit, OnDestroy {

  private readonly clientService = inject(ClientService);
  private readonly modalService = inject(NgbModal);

  private readonly subscriptions: Subscription[] = [];

  protected readonly clients$ = this.clientService.clients$;


  public ngOnInit() {
    this.clientService.updateClients();
  }


  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  protected addClient() {
    const modalRef = this.modalService.open(ClientEditComponent);
    modalRef.componentInstance.client = signal(createEmptyClient());

    modalRef.result
      .then(client => {
        this.subscriptions.push(
          this.clientService.addClient(client).subscribe()
        );
      })
      .catch(() => {});
  }


  protected onClientEdit(client: Client) {
    const modalRef = this.modalService.open(ClientEditComponent);
    modalRef.componentInstance.client = signal(client);

    modalRef.result
      .then(client => {
        this.subscriptions.push(
          this.clientService.updateClient(client).subscribe()
        );
      })
      .catch(() => {});
  }


  protected onClientDelete(client: Client) {
    this.subscriptions.push(
      this.clientService.deleteClient(client).subscribe()
    );
  }

}

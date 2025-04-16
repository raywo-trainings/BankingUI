import { Component, inject, OnInit } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { AsyncPipe } from "@angular/common";
import { ClientRowViewComponent } from "../client-row-view/client-row-view.component";
import { AddButtonComponent } from "../../../common/components/add-button/add-button.component";
import { Client } from "../../models/client.model";


@Component({
  selector: "app-client-list",
  imports: [
    AsyncPipe,
    ClientRowViewComponent,
    AddButtonComponent
  ],
  templateUrl: "./client-list.component.html"
})
export class ClientListComponent implements OnInit {

  private readonly clientService = inject(ClientService);

  protected readonly clients$ = this.clientService.clients$;


  public ngOnInit() {
    this.clientService.updateClients();
  }


  protected addClient() {
    throw new Error("Method not implemented.");
  }


  protected onClientEdit(client: Client) {
    throw new Error("Method not implemented.");
  }

  protected onClientDelete(client: Client) {
    throw new Error("Method not implemented.");
  }

}

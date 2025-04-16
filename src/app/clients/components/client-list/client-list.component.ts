import { Component, inject, OnInit } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { AsyncPipe } from "@angular/common";
import { ClientRowViewComponent } from "../client-row-view/client-row-view.component";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: "app-client-list",
  imports: [
    AsyncPipe,
    ClientRowViewComponent,
    FaIconComponent
  ],
  templateUrl: "./client-list.component.html"
})
export class ClientListComponent implements OnInit {

  private readonly clientService = inject(ClientService);

  protected readonly clients$ = this.clientService.clients$;
  protected readonly faPlus = faPlus;


  public ngOnInit() {
    this.clientService.updateClients();
  }


  protected addClient() {

  }
}

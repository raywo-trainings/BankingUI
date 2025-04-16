import { Component, input, output } from "@angular/core";
import { Client } from "../../models/client.model";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: "app-client-row-view",
  imports: [
    FaIconComponent
  ],
  templateUrl: "./client-row-view.component.html"
})
export class ClientRowViewComponent {

  protected readonly faTrash = faTrash;

  public client = input.required<Client>();
  public clientDeleted = output<Client>();


  protected deleteClient() {
    this.clientDeleted.emit(this.client());
  }

}

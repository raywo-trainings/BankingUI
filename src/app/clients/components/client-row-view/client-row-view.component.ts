import { Component, input, output } from "@angular/core";
import { Client } from "../../models/client.model";
import { DeleteButtonComponent } from "../../../common/components/delete-button/delete-button.component";
import { EditButtonComponent } from "../../../common/components/edit-button/edit-button.component";


@Component({
  selector: "app-client-row-view",
  imports: [
    DeleteButtonComponent,
    EditButtonComponent
  ],
  templateUrl: "./client-row-view.component.html"
})
export class ClientRowViewComponent {

  public client = input.required<Client>();
  public deleteClicked = output<Client>();
  public editClicked = output<Client>();


  protected onDeleteConfirmed() {
    this.deleteClicked.emit(this.client());
  }


  protected onEditClick() {
    this.editClicked.emit(this.client());
  }
}

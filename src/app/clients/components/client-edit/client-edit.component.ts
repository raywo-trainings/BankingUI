import { Component, effect, inject, input } from "@angular/core";
import { Client } from "../../models/client.model";
import { FormsModule } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: "app-client-edit",
  imports: [
    FormsModule
  ],
  templateUrl: "./client-edit.component.html"
})
export class ClientEditComponent {

  private readonly modal = inject(NgbActiveModal);

  protected firstname = "";
  protected lastname = "";

  public client = input.required<Client>();


  constructor() {
    effect(() => {
      this.firstname = this.client().firstname;
      this.lastname = this.client().lastname;
    });
  }


  protected isEdit(): boolean {
    return this.client().id !== undefined;
  }


  protected onCancel() {
    this.modal.dismiss();
  }


  protected onSubmit() {
    const newClient: Client = {
      ...this.client(),
      firstname: this.firstname,
      lastname: this.lastname
    };

    this.modal.close(newClient);
  }

}

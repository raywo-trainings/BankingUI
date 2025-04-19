import { Component, inject, input, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { EntryType, EntryWriteDTO } from "../../models/entry.model";


@Component({
  selector: "app-entry-edit",
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: "./entry-edit.component.html"
})
export class EntryEditComponent implements OnInit {

  private readonly activeModal = inject(NgbActiveModal);

  protected amount = 0;
  protected description = "Einzahlung";

  public type = input.required<EntryType>();


  public ngOnInit() {
    switch (this.type()) {
      case "deposit":
        this.description = "Einzahlung";
        break;
      case "withdraw":
        this.description = "Auszahlung";
        break;
    }
  }


  protected onCancel() {
    this.activeModal.dismiss();
  }


  protected onSubmit() {
    const entry: EntryWriteDTO = {
      amount: this.amount,
      description: this.description,
      entryDate: new Date(),
      entryType: this.type()
    };

    this.activeModal.close(entry);
  }

}

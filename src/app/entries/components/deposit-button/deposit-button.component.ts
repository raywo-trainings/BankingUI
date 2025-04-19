import { Component, inject, input, OnDestroy, signal } from "@angular/core";
import { Account } from "../../../accounts/models/account.model";
import { FormsModule } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EntryService } from "../../services/entry.service";
import { Subscription } from "rxjs";
import { EntryEditComponent } from "../entry-edit/entry-edit.component";
import { EntryType, EntryWriteDTO } from "../../models/entry.model";


@Component({
  selector: "app-deposit-button",
  imports: [
    FormsModule
  ],
  templateUrl: "./deposit-button.component.html"
})
export class DepositButtonComponent implements OnDestroy {

  private readonly modalService = inject(NgbModal);
  private readonly entryService = inject(EntryService);

  private readonly subscriptions: Subscription[] = [];

  public account = input.required<Account>();


  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  protected onClick() {
    const modalRef = this.modalService.open(EntryEditComponent);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    modalRef.componentInstance.type = signal("deposit" as EntryType);

    modalRef.result
      .then((entry: EntryWriteDTO) => {
        console.log(entry);
        this.subscriptions.push(
          this.entryService.deposit(this.account(), entry).subscribe()
        );
      })
      .catch(() => {
        /* Do nothing. */
      });
  }

}

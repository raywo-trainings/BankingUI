import { Component, HostListener, inject, input, OnDestroy, output, signal } from "@angular/core";
import { Account } from "../../../accounts/models/account.model";
import { FormsModule } from "@angular/forms";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { EntryService } from "../../services/entry.service";
import { Subscription } from "rxjs";
import { EntryEditComponent } from "../entry-edit/entry-edit.component";
import { EntryType, EntryWriteDTO } from "../../models/entry.model";


@Component({
  selector: "button[app-deposit-button]",
  imports: [
    FormsModule
  ],
  template: "{{caption}}",
  host: {
    class: "btn btn-deposit"
  }
})
export class DepositButtonComponent implements OnDestroy {

  private readonly modalService = inject(NgbModal);
  private readonly entryService = inject(EntryService);

  private readonly subscriptions: Subscription[] = [];

  protected caption = "Einzahlen";

  public account = input.required<Account>();
  public depositSuccess = output<Account>();


  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  @HostListener("click", ["$event"])
  protected onClickHost(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    const options: NgbModalOptions = {
      ariaLabelledBy: this.caption
    };

    const modalRef = this.modalService.open(EntryEditComponent, options);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    modalRef.componentInstance.type = signal("deposit" as EntryType);

    modalRef.result
      .then((entry: EntryWriteDTO) => {
        this.subscriptions.push(
          this.entryService.deposit(this.account(), entry)
            .subscribe(() => this.depositSuccess.emit(this.account()))
        );
      })
      .catch(() => {
        /* Do nothing. */
      });
  }

}

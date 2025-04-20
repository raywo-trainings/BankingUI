import { Component, HostListener, inject, input, OnDestroy, output, signal } from "@angular/core";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { EntryService } from "../../services/entry.service";
import { Subscription } from "rxjs";
import { Account } from "../../../accounts/models/account.model";
import { EntryEditComponent } from "../entry-edit/entry-edit.component";
import { EntryType, EntryWriteDTO } from "../../models/entry.model";


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "button[app-withdraw-button]",
  imports: [],
  template: "{{caption}}",
  host: {
    class: "btn btn-withdraw"
  }
})
export class WithdrawButtonComponent implements OnDestroy {

  private readonly modalService = inject(NgbModal);
  private readonly entryService = inject(EntryService);

  private readonly subscriptions: Subscription[] = [];

  protected caption = "Auszahlen";

  public account = input.required<Account>();
  public withdrawSuccess = output<Account>();


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
    modalRef.componentInstance.type = signal("withdraw" as EntryType);

    modalRef.result
      .then((entry: EntryWriteDTO) => {
        this.subscriptions.push(
          this.entryService.withdraw(this.account(), entry)
            .subscribe(() => this.withdrawSuccess.emit(this.account()))
        );
      })
      .catch(() => {
        /* Do nothing. */
      });
  }

}

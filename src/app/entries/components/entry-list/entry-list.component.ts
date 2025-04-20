import { Component, effect, inject, input, model, OnDestroy } from "@angular/core";
import { Account } from "../../../accounts/models/account.model";
import { EntryService } from "../../services/entry.service";
import { Subscription } from "rxjs";
import { Entry } from "../../models/entry.model";
import { EntryRowComponent } from "../entry-row/entry-row.component";
import { DateTime } from "luxon";


@Component({
  selector: "app-entry-list",
  imports: [
    EntryRowComponent
  ],
  templateUrl: "./entry-list.component.html"
})
export class EntryListComponent implements OnDestroy {

  private readonly entryService = inject(EntryService);

  private readonly subscriptions: Subscription[] = [];

  protected entries: Entry[] = [];

  public account = input.required<Account>();
  public fromDate = model<DateTime | null>(null);
  public toDate = model<DateTime | null>(null);


  constructor() {
    effect(() => {
      const from = this.fromDate()?.toJSDate();
      const to = this.toDate()?.toJSDate();

      this.subscriptions.push(
        this.entryService.getEntriesForAccount(this.account(), from, to)
          .subscribe(entries => this.entries = entries)
      );
    });
  }


  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}

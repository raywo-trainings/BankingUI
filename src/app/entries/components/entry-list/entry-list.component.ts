import { Component, effect, inject, input, model, OnDestroy } from "@angular/core";
import { Account } from "../../../accounts/models/account.model";
import { EntryService } from "../../services/entry.service";
import { Subscription } from "rxjs";
import { Entry } from "../../models/entry.model";
import { EntryRowComponent } from "../entry-row/entry-row.component";
import { FormsModule } from "@angular/forms";
import { NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";
import { DateParserFormatterService } from "../../../common/services/date-parser-formatter.service";
import { DateRangePickerComponent } from "../../../common/components/date-range-picker/date-range-picker.component";
import { DateTime } from "luxon";


@Component({
  selector: "app-entry-list",
  imports: [
    EntryRowComponent,
    FormsModule,
    DateRangePickerComponent
  ],
  templateUrl: "./entry-list.component.html",
  providers: [
    { provide: NgbDateParserFormatter, useClass: DateParserFormatterService }
  ]
})
export class EntryListComponent implements OnDestroy {

  private readonly entryService = inject(EntryService);

  private readonly subscriptions: Subscription[] = [];

  protected entries: Entry[] = [];
  protected fromDate = model<DateTime | null>(null);
  protected toDate = model<DateTime | null>(null);

  public account = input.required<Account>();


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

import { Component, effect, inject, input, LOCALE_ID, OnDestroy } from "@angular/core";
import { Account } from "../../../accounts/models/account.model";
import { EntryService } from "../../services/entry.service";
import { Subscription } from "rxjs";
import { Entry } from "../../models/entry.model";
import { EntryRowComponent } from "../entry-row/entry-row.component";
import { FormsModule } from "@angular/forms";
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbInputDatepicker } from "@ng-bootstrap/ng-bootstrap";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { DateParserFormatterService } from "../../../common/services/date-parser-formatter.service";
import { DateTime } from "luxon";


type FilterDate = "from" | "to";

@Component({
  selector: "app-entry-list",
  imports: [
    EntryRowComponent,
    FormsModule,
    NgbInputDatepicker,
    FaIconComponent
  ],
  templateUrl: "./entry-list.component.html",
  providers: [
    { provide: NgbDateParserFormatter, useClass: DateParserFormatterService }
  ]
})
export class EntryListComponent implements OnDestroy {

  private readonly entryService = inject(EntryService);
  private readonly calendar = inject(NgbCalendar);
  private readonly locale = inject(LOCALE_ID);

  private readonly subscriptions: Subscription[] = [];

  protected readonly formatter = inject(NgbDateParserFormatter);

  protected entries: Entry[] = [];

  protected hoveredDate: NgbDate | null = null;
  protected fromDate: NgbDate | null = null;
  protected toDate: NgbDate | null = null;

  protected readonly faCalendarAlt = faCalendarAlt;

  public account = input.required<Account>();


  constructor() {
    effect(() => {
      this.subscriptions.push(
        this.entryService.getEntriesForAccount(this.account())
          .subscribe(entries => this.entries = entries)
      );
    });
  }


  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  protected onDateSelection(date: NgbDate) {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const dtOptions = { locale: this.locale, zone: timeZone };

    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;

      const from = DateTime
        .fromObject(this.fromDate, dtOptions)
        .startOf("day")
        .toJSDate();

      this.subscriptions.push(
        this.entryService.getEntriesForAccount(this.account(), from)
          .subscribe(entries => this.entries = entries)
      );
    } else if (this.fromDate && !this.toDate && date?.after(this.fromDate)) {
      this.toDate = date;

      const from = DateTime
        .fromObject(this.fromDate, dtOptions)
        .startOf("day")
        .toJSDate();
      const to = DateTime
        .fromObject(this.toDate, dtOptions)
        .endOf("day")
        .toJSDate();

      this.subscriptions.push(
        this.entryService.getEntriesForAccount(this.account(), from, to)
          .subscribe(entries => this.entries = entries)
      );
    } else {
      this.toDate = null;
      this.fromDate = date;

      const from = DateTime
        .fromObject(this.fromDate, dtOptions)
        .startOf("day")
        .toJSDate();

      this.subscriptions.push(
        this.entryService.getEntriesForAccount(this.account(), from)
          .subscribe(entries => this.entries = entries)
      );
    }
  }


  protected isHovered(date: NgbDate) {
    return (
      this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
    );
  }


  protected isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }


  protected isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }


  protected isFrom(date: NgbDate) {
    return date.equals(this.fromDate);
  }


  protected isTo(date: NgbDate) {
    return date.equals(this.toDate);
  }


  protected onInputChange(input: string,
                          filterDate: FilterDate) {
    const parsed = this.formatter.parse(input);

    if (parsed && this.calendar.isValid(NgbDate.from(parsed))) {
      if (filterDate === "from") {
        this.fromDate = NgbDate.from(parsed);
        console.log("fromDate: ", this.fromDate);
      } else {
        this.toDate = NgbDate.from(parsed);
      }
    }
  }

}

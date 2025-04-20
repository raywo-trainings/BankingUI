import { Component, inject, LOCALE_ID, model } from "@angular/core";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbInputDatepicker } from "@ng-bootstrap/ng-bootstrap";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { DateTime } from "luxon";
import { toDateTime } from "../../helper/to-date-time.helper";
import { DateParserFormatterService } from "../../services/date-parser-formatter.service";


type DateType = "from" | "to";


@Component({
  selector: "app-date-range-picker",
  imports: [
    FaIconComponent,
    NgbInputDatepicker
  ],
  templateUrl: "./date-range-picker.component.html",
  providers: [
    { provide: NgbDateParserFormatter, useClass: DateParserFormatterService }
  ]
})
export class DateRangePickerComponent {

  private readonly calendar = inject(NgbCalendar);
  private readonly locale = inject(LOCALE_ID);

  protected readonly formatter = inject(NgbDateParserFormatter);

  protected readonly faCalendar = faCalendar;

  protected hoveredDate: NgbDate | null = null;
  protected from: NgbDate | null = null;
  protected to: NgbDate | null = null;

  public fromDate = model<DateTime | null>();
  public toDate = model.required<DateTime | null>();


  protected onDateSelection(date: NgbDate) {
    if (!this.from && !this.to) {
      this.from = date;
      this.fromDate.set(this.toDateTime(this.from, "from"));
    } else if (this.from && !this.to && date?.after(this.from)) {
      this.to = date;
      this.fromDate.set(this.toDateTime(this.from, "from"));
      this.toDate.set(this.toDateTime(this.to, "to"));
    } else {
      this.to = null;
      this.from = date;
      this.fromDate.set(this.toDateTime(this.from, "from"));
    }
  }


  protected isHovered(date: NgbDate): boolean {
    if (!this.from || this.to || !this.hoveredDate) return false;

    return date.after(this.from) && date.before(this.hoveredDate);
  }


  protected isInside(date: NgbDate): boolean {
    if (!this.from || !this.to) return false;

    return date.after(this.from) && date.before(this.to);
  }


  protected isRange(date: NgbDate) {
    /*
    eslint-disable @typescript-eslint/prefer-nullish-coalescing
     -- this.to would result in boolean | null, which is what this
        rule is complaining about. But (this.to ?? false) is not
        very readable.
    */
    return (
      date.equals(this.from) ||
      (this.to && date.equals(this.to)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
    /* eslint-enable @typescript-eslint/prefer-nullish-coalescing */
  }


  protected isFrom(date: NgbDate): boolean {
    return date.equals(this.from);
  }


  protected isTo(date: NgbDate): boolean {
    return date.equals(this.to);
  }


  protected onInputChange(input: string,
                          filterDate: DateType) {
    if (input.length === 0) {
      switch (filterDate) {
        case "from":
          this.from = null;
          this.fromDate.set(null);
          return;
        case "to":
          this.to = null;
          this.toDate.set(null);
          return;
      }
    }

    const parsed = this.formatter.parse(input);

    if (parsed && this.calendar.isValid(NgbDate.from(parsed))) {
      if (filterDate === "from") {
        this.from = NgbDate.from(parsed);
        this.fromDate.set(this.toDateTime(this.from, "from"));
      } else {
        this.to = NgbDate.from(parsed);
        this.toDate.set(this.toDateTime(this.to, "to"));
      }
    }
  }


  private toDateTime(date: NgbDate | null, dateType: DateType): DateTime | null {
    if (!date) return null;

    switch (dateType) {
      case "from":
        return toDateTime(date, this.locale).startOf("day");
      case "to":
        return toDateTime(date, this.locale).endOf("day");
      default:
        return toDateTime(date, this.locale);
    }
  }

}

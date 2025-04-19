import { inject, Injectable, LOCALE_ID } from "@angular/core";
import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { formatDate } from "@angular/common";
import { DateTime } from "luxon";


@Injectable({
  providedIn: "root"
})
export class DateParserFormatterService extends NgbDateParserFormatter {

  private readonly locale = inject(LOCALE_ID);


  override parse(value: string): NgbDateStruct | null {
    if (!value) return null;

    let parsed = DateTime.fromFormat(value, "d.M.yyyy", { locale: this.locale });

    if (!parsed.isValid) {
      parsed = DateTime.fromFormat(value, "d.M.yy", { locale: this.locale });
    }

    if (!parsed.isValid) return null;

    return {
      day: parsed.day,
      month: parsed.month,
      year: parsed.year
    };
  }


  override format(date: NgbDateStruct | null): string {
    if (!date) return "";

    const month = String(date?.month).padStart(2, "0");
    const day = String(date?.day).padStart(2, "0");
    const isoDate = `${date?.year}-${month}-${day}T00:00:00`;

    return formatDate(isoDate, "mediumDate", this.locale);
  }

}

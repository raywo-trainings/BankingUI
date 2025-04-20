import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { DateTime } from "luxon";


export function toDateTime(date: NgbDate, locale: string): DateTime {
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dtOptions = { locale, zone };

  return DateTime.fromObject(date, dtOptions);
}

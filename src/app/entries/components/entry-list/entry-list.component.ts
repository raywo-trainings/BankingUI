import { Component, effect, inject, input } from "@angular/core";
import { Account } from "../../../accounts/models/account.model";
import { EntryService } from "../../services/entry.service";
import { Observable, of } from "rxjs";
import { Entry } from "../../models/entry.model";
import { EntryRowComponent } from "../entry-row/entry-row.component";
import { AsyncPipe } from "@angular/common";


@Component({
  selector: "app-entry-list",
  imports: [
    EntryRowComponent,
    AsyncPipe
  ],
  templateUrl: "./entry-list.component.html"
})
export class EntryListComponent {

  private readonly entryService = inject(EntryService);

  protected entries$: Observable<Entry[]> = of([]);

  public account = input.required<Account>();


  constructor() {
    effect(() => {
      this.entries$ = this.entryService.getEntriesForAccount(this.account());
    });
  }

}

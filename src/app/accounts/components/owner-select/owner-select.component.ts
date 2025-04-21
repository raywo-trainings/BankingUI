import { Component, inject, input, model, OnInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { Client, createEmptyClient } from "../../../clients/models/client.model";
import { fullName } from "../../../clients/pipes/fullName.pipe";
import { debounceTime, distinctUntilChanged, filter, map, merge, Observable, OperatorFunction, Subject, switchMap } from "rxjs";
import { ClientService } from "../../../clients/services/client.service";


@Component({
  selector: "app-owner-select",
  imports: [
    FormsModule,
    NgbTypeahead
  ],
  templateUrl: "./owner-select.component.html"
})
export class OwnerSelectComponent implements OnInit {

  public owner = model<Client>(createEmptyClient());
  public readonly = input<boolean>(false);

  private readonly clientService = inject(ClientService);

  @ViewChild("typeahead", { static: true })
  private typeahead!: NgbTypeahead;

  protected readonly focus$ = new Subject<string>();
  protected readonly click$ = new Subject<string>();


  public ngOnInit() {
    this.clientService.updateClients();
  }


  protected formatter = (client: Client): string => {
    return fullName(client);
  };


  protected search: OperatorFunction<string, readonly Client[]> =
    (text$: Observable<string>): Observable<Client[]> => {
      const debouncedText$ = text$
        .pipe(
          debounceTime(200),
          distinctUntilChanged()
        );
      const clicksWithClosedPopup$ = this.click$
        .pipe(filter(() => !this.typeahead.isPopupOpen()));
      const inputFocus$ = this.focus$;

      return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
        switchMap(term => {
          if (term === "") {
            return this.clientService.clients$
              .pipe(
                map(clients => [...clients].splice(0, 10))
              );
          }

          return this.clientService.clients$
            .pipe(
              map(clients => clients.filter(client =>
                fullName(client).toLowerCase().includes(term.toLowerCase())
              ))
            );
        })
      );
    };

}

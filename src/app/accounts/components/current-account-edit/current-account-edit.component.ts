import { Component, effect, inject, input, OnInit, ViewChild } from "@angular/core";
import { NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { AccountType, CurrentAccount } from "../../models/account.model";
import { Client, createEmptyClient } from "../../../clients/models/client.model";
import { FormsModule } from "@angular/forms";
import { debounceTime, distinctUntilChanged, filter, map, merge, Observable, OperatorFunction, Subject, switchMap } from "rxjs";
import { ClientService } from "../../../clients/services/client.service";
import { fullName } from "../../../clients/pipes/fullName.pipe";


@Component({
  selector: "app-current-account-edit",
  imports: [
    FormsModule,
    NgbTypeahead
  ],
  templateUrl: "./current-account-edit.component.html"
})
export class CurrentAccountEditComponent implements OnInit {

  // private readonly modal = inject(NgbActiveModal);
  private clientService = inject(ClientService);

  @ViewChild("ownerTypeahead", { static: true })
  private ownerTypeahead!: NgbTypeahead;

  protected ownerFocus$ = new Subject<string>();
  protected ownerClick$ = new Subject<string>();

  protected iban = "";
  protected balance = 0;
  protected owner = createEmptyClient();
  protected type: AccountType = "current";
  protected overdraftLimit?: number;
  protected overdraftInterestRate?: number;

  public account = input<CurrentAccount>();


  constructor() {
    effect(() => {
      const account = this.account();

      if (!account) {
        this.iban = "";
        this.balance = 0;
        this.owner = createEmptyClient();
        this.type = "current";
        this.overdraftLimit = undefined;
        this.overdraftInterestRate = undefined;

        return;
      }

      this.iban = account.iban;
      this.balance = account.balance;
      this.owner = account.owner;
      this.type = account.type;
      this.overdraftLimit = account.overdraftLimit;
      this.overdraftInterestRate = account.overdraftInterestRate;
    });
  }


  public ngOnInit() {
    this.clientService.updateClients();
  }


  protected ownerFormatter = (client: Client): string => {
    return fullName(client);
  };

  protected ownerSearch: OperatorFunction<string, readonly Client[]> =
    (text$: Observable<string>): Observable<Client[]> => {
      const debouncedText$ = text$
        .pipe(
          debounceTime(200),
          distinctUntilChanged()
        );
      const clicksWithClosedPopup$ = this.ownerClick$
        .pipe(filter(() => !this.ownerTypeahead.isPopupOpen()));
      const inputFocus$ = this.ownerFocus$;

      return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
        switchMap(term => {
          console.log(term);
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


  protected isEdit(): boolean {
    return this.account() !== undefined;
  }


  protected onCancel() {

  }


  protected onSubmit() {

  }


  protected readonly focus = focus;
}

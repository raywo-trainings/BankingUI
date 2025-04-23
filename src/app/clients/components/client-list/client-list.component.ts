import { Component, effect, inject, model, OnDestroy, OnInit, signal } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { AsyncPipe } from "@angular/common";
import { ClientRowViewComponent } from "../client-row-view/client-row-view.component";
import { AddButtonComponent } from "../../../common/components/add-button/add-button.component";
import { Client, createEmptyClient } from "../../models/client.model";
import { combineLatest, map, Observable, of, Subscription } from "rxjs";
import { ClientEditComponent } from "../client-edit/client-edit.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { FilterInputComponent } from "../../../common/components/filter-input/filter-input.component";
import { toObservable } from "@angular/core/rxjs-interop";
import { fullName } from "../../pipes/fullName.pipe";


@Component({
  selector: "app-client-list",
  imports: [
    AsyncPipe,
    ClientRowViewComponent,
    AddButtonComponent,
    RouterLink,
    FormsModule,
    FilterInputComponent
  ],
  templateUrl: "./client-list.component.html"
})
export class ClientListComponent implements OnInit, OnDestroy {

  private readonly clientService = inject(ClientService);
  private readonly modalService = inject(NgbModal);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly subscriptions: Subscription[] = [];

  protected readonly clients$ = this.clientService.clients$;
  protected filterText = model<string>();
  protected filterText$ = toObservable(this.filterText);
  protected filteredClients$: Observable<Client[]> = of([]);


  constructor() {
    effect(() => {
      void this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {
          filterText: this.filterText()
        },
        queryParamsHandling: "merge"
      });
    });
  }


  public ngOnInit() {
    this.clientService.updateClients();

    this.subscriptions.push(
      this.activatedRoute.queryParams
        .subscribe(params => {
          const filterText = params["filterText"] as string | null | undefined;

          if (filterText) this.filterText.set(filterText);
        })
    );

    this.filteredClients$ = combineLatest([this.filterText$, this.clients$])
      .pipe(
        map(([filterText, clients]) => {
          if (!filterText || filterText === "") return clients;

          return clients
            .filter(client =>
              fullName(client).toLowerCase().includes(filterText.toLowerCase()));
        })
      );
  }


  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  protected addClient() {
    const modalRef = this.modalService.open(ClientEditComponent);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    modalRef.componentInstance.client = signal(createEmptyClient());

    modalRef.result
      .then(client => {
        this.subscriptions.push(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          this.clientService.addClient(client).subscribe()
        );
      })
      .catch(() => { /* Do nothing. */
      });
  }

}

import { Component, input, model } from "@angular/core";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@Component({
  selector: "app-filter-input",
  imports: [
    FaIconComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: "./filter-input.component.html"
})
export class FilterInputComponent {

  protected readonly faSearch = faSearch;

  public filterText = model<string>();
  public placeholder = input<string>("Suchen");

}

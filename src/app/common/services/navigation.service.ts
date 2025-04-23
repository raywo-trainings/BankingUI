import { inject, Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Location } from "@angular/common";


@Injectable({
  providedIn: "root"
})
export class NavigationService {

  private readonly router = inject(Router);
  private readonly location = inject(Location);

  private _history: string[] = [];


  constructor() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this._history.push(this.location.path());
      }
    });
  }


  public async back() {
    this._history.pop();

    if (this._history.length > 0) {
      this.location.back();
    } else {
      await this.router.navigateByUrl("/");
    }
  }

}

import { Injectable } from "@angular/core";
import { Toast } from "../models/toast.model";
import { BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: "root"
})
export class ToastService {

  private _toasts = new BehaviorSubject<Toast[]>([]);
  public toasts$ = this._toasts.asObservable();


  public show(toast: Toast) {
    this.toasts = this.toasts.concat(toast);
  }


  public remove(toast: Toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }


  public clear() {
    this.toasts = [];
  }


  private get toasts(): Toast[] {
    return this._toasts.getValue();
  }


  private set toasts(toasts: Toast[]) {
    this._toasts.next(toasts);
  }

}

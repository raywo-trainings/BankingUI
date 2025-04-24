import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { OnlineStatus } from "../models/online-status.model";


@Injectable({
  providedIn: "root"
})
export class OnlineStatusService {

  private _status = new BehaviorSubject<OnlineStatus>("offline");
  public onlineStatus$ = this._status.asObservable();


  public setOnline() {
    this._status.next("online");
  }


  public setOffline() {
    this._status.next("offline");
  }


  public getIsOnline() {
    return this._status.getValue();
  }

}

import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  private showEvent = new BehaviorSubject<boolean>(false);
  currentShowEvent = this.showEvent.asObservable();

  constructor() { }

  editShowEvent(newClick: boolean) {
    this.showEvent.next(newClick);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private showEvent = new BehaviorSubject<any[]>([]);
  currentShowEvent = this.showEvent.asObservable();

  constructor() { }

  showInfoEvent(filesArray: any[]) {
    this.showEvent.next(filesArray);
  }
}

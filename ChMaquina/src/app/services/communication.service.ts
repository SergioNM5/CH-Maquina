import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FileCH } from '../models/file-ch';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private showEvent = new BehaviorSubject<any[]>([]);
  currentShowEvent = this.showEvent.asObservable();

  constructor() { }

  showInfoEvent(fileCh: any[]) {
    this.showEvent.next(fileCh);
  }
}

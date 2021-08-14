import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FileCH } from '../models/file-ch';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  // Files Array Observable
  private showEvent = new BehaviorSubject<any[]>([]);
  currentShowEvent = this.showEvent.asObservable();

  // Acumulator, Kernel and Memory Array Observable
  private inputs = new BehaviorSubject<number[]>([0,19,100]);
  currentInputs = this.inputs.asObservable();

  constructor() { }

  showInfoEvent(fileCh: any[]) {
    this.showEvent.next(fileCh);
  }

  showInputs(inputs: number[]) {
    this.inputs.next(inputs);
  }
}

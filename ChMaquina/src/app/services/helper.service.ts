import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  private showEvent = new BehaviorSubject<boolean>(false);
  currentShowEvent = this.showEvent.asObservable();

  private fileToRun = new BehaviorSubject<number>(0);
  currentFileToRun = this.fileToRun.asObservable();

  private amountSteptoStep = new BehaviorSubject<number>(0);
  currentAmountSteptoStep = this.amountSteptoStep.asObservable();

  private acumulator = new BehaviorSubject<number>(0);
  currentAcumulator = this.acumulator.asObservable();

  constructor() { }

  editShowEvent(newClick: boolean) {
    this.showEvent.next(newClick);
  }

  editFileToRunEvent(newValue: number) {
    this.fileToRun.next(newValue);
  }

  editAmountSteptoStepEvent(amount: number) {
    this.amountSteptoStep.next(amount);
  }

  editAcumulatorEvent(acumulator: number) {
    this.acumulator.next(acumulator);
  }

}

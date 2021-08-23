import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HelperService } from '../services/helper.service';
import { CommunicationService } from '../services/communication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  showEvent: boolean = false;
  enableButtons: boolean = false;
  btnMessage: string = 'Encender';
  filesArray: any[] = [];
  fileToRun: number = 0;
  amountSteptoStep: number = 0;
  mode: string = 'Modo Kernel'

  constructor(
    private breakpointObserver: BreakpointObserver,
    private helper: HelperService,
    private communication: CommunicationService,
  ) { }

  ngOnInit() {
    this.helper.currentShowEvent.subscribe(showEvent => this.showEvent = showEvent);
    this.communication.currentShowEvent.subscribe(state => {
      this.filesArray = state;
      if (this.filesArray.length > 0) {
        this.enableButtons = true;
      }
    });
  }

  toggleEvent(event: any): void {
    this.mode = 'Modo Usuario';
    this.showEvent = !this.showEvent;
    this.helper.editShowEvent(this.showEvent);
    if (this.showEvent) {
      this.btnMessage = 'Apagar';
    } else {
      window.location.reload();
    }
  }

  runEvent(event: any): void {
    this.helper.editFileToRunEvent(this.fileToRun);
    this.fileToRun++;
  }

  runSteptoStep(): void {
    this.helper.editAmountSteptoStepEvent(this.amountSteptoStep);
    this.amountSteptoStep++
  }
}

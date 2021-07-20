import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HelperService } from '../services/helper.service';

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
  btnMessage: string = 'Encender';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private helper: HelperService
  ) { }

  ngOnInit() {
    this.helper.currentShowEvent.subscribe(showEvent => this.showEvent = showEvent);
  }

  toggleEvent(event: any): void {
    this.showEvent = !this.showEvent;
    this.helper.editShowEvent(this.showEvent);
    if (this.showEvent) {
      this.btnMessage = 'Apagar';
    } else {
      this.btnMessage = 'Encender';
    }
  }
}

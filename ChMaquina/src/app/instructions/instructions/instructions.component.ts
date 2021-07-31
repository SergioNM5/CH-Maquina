import { Component, OnInit } from '@angular/core';
import { ProcessFileService } from 'src/app/home/services/process-file.service';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {

  filesArray: any[] = [];
  DATA_INSTRUCTIONS: any[] = [];

  displayedColumns: string[] = ['id', 'instructions'];
  dataSource = this.DATA_INSTRUCTIONS;

  constructor(
    private communication: CommunicationService,
    private processFile: ProcessFileService
  ) { }

  ngOnInit(): void {
    this.communication.currentShowEvent.subscribe(state => {
      this.filesArray = state
      for (let file of this.filesArray) {
        let linesSpaced: string[] = [];
        for (let i of file.codeLines) {
          linesSpaced.push(i.join(' '));
        }
        let lineController: number = 0;
        for (let line = +file.ipMemory; line <= +file.fpMemory; line++) {
          let instructionsInfo = {
            id: this.processFile.zeroFill(String(line), 4),
            instructions: linesSpaced[lineController]
          };
          this.DATA_INSTRUCTIONS.push(instructionsInfo);
          lineController++;
        }
      }
    });
  }

}

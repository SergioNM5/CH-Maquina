import { Component, OnInit } from '@angular/core';
import { ProcessFileService } from 'src/app/home/services/process-file.service';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss']
})
export class MemoryComponent implements OnInit {

  acumulator: number = 0;
  kernel: number = 0;
  memory: number = 0;
  filesArray: any[] = [];

  DATA_MEMORY: any[] = [];

  displayedColumns: string[] = ['id', 'value'];
  dataSource = this.DATA_MEMORY;

  constructor(
    private communication: CommunicationService,
    private processFile: ProcessFileService
  ) { }

  ngOnInit() {
    this.communication.currentInputs.subscribe(inputs => {
      this.acumulator = inputs[0];
      this.kernel = inputs[1];
      this.memory = inputs[2];
    });
    this.communication.currentShowEvent.subscribe(state => {
      this.filesArray = state;

      this.DATA_MEMORY.push({
        id: '0000',
        value: this.acumulator
      })
      for (let kernelCounter = 1; kernelCounter <= +this.kernel; kernelCounter++) {
        let valueKernel = {
          id: this.processFile.zeroFill(String(kernelCounter), 4),
          value: 'CHSO-2021'
        }
        this.DATA_MEMORY.push(valueKernel);
      }

      for (let file of this.filesArray) {
        let linesSpaced: string[] = [];
        for (let i of file.codeLines) {
          linesSpaced.push(i.join(' '));
        }
        let lineController: number = 0;
        for (let i = +file.ipMemory ; i <= +file.fpMemory; i++) {
          let valueFile = {
            id: this.processFile.zeroFill(String(i), 4),
            value: linesSpaced[lineController]
          }
          this.DATA_MEMORY.push(valueFile);
          lineController++;
        }
        let variablesController = 0;
        for (let i = +file.fpMemory + 1; i <= +file.fpvMemory; i++) {
          let valueVariables = {
            id: this.processFile.zeroFill(String(i), 4),
            value: file.variables[variablesController].value
          }
          this.DATA_MEMORY.push(valueVariables);
          variablesController++;
        }
      }
      for (let i = +this.DATA_MEMORY.length; i < +this.memory; i++) {
        let emptyValue = {
          id: this.processFile.zeroFill(String(i), 4),
          value: '----'
        }
        this.DATA_MEMORY.push(emptyValue);
      }
    })
  }

}

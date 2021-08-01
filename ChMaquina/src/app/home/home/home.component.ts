import { Component, OnInit } from '@angular/core';
import { ProcessFileService } from '../services/process-file.service';
import { HelperService } from 'src/app/services/helper.service';
import { CommunicationService } from 'src/app/services/communication.service';
import { state } from '@angular/animations';
import { RunProcessService } from '../services/run-process.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  fileName: string = '';
  fileLoaded: any = '';
  file: any;
  filesArray: any[] = [];
  kernel: number = 19;
  memory: number = 100;
  acumulator: string = '0';
  contId: number = 1 + this.kernel;
  buttonState: boolean = false;
  fileToRun: number = 0;

  constructor(
    private processFile: ProcessFileService,
    private helper: HelperService,
    private communication: CommunicationService,
    private runProcess: RunProcessService
  ) { }

  onFileSelected(event: any) {
    this.communication.currentShowEvent.subscribe(state => {
      this.filesArray = state;
      this.contId = (this.filesArray[this.filesArray.length - 1]) != undefined ?
        +this.filesArray[this.filesArray.length - 1].fpvMemory + 1 : 1 + this.kernel;
    });
    this.file = event.target.files[0];
    this.fileName = event.target.files[0].name;
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.fileLoaded = fileReader.result;
    }
    fileReader.readAsText(this.file);
    setTimeout(() => {
      this.filesArray.push(this.processFile.transformFile(this.fileLoaded, this.kernel, this.contId, this.filesArray.length, this.fileName));
      if (this.filesArray.length > 0) {
        this.contId = +this.filesArray[this.filesArray.length - 1].fpvMemory + 1;
      }
      if (this.filesArray[this.filesArray.length - 1].fpvMemory > this.memory) {
        this.filesArray.pop();
        alert('Capacidad de Memoria excedida');
      }
      this.loadInformation(this.filesArray);
      this.loadInputs([+this.acumulator, this.kernel, this.memory]);
    }, 1000)
    setTimeout(() => {
      console.log(this.filesArray); // Quitar
    }, 1000);
  }

  getKernel(event: any): void {
    this.kernel = event.target.value;
    this.contId = 1 + +this.kernel;
  }

  getMemory(event: any): void {
    this.memory = event.target.value;
  }

  ngOnInit() {
    this.helper.currentShowEvent.subscribe(state => {
      this.buttonState = state;
    });
    this.helper.currentFileToRun.subscribe(value => {
      this.fileToRun = value;
      if (this.filesArray.length !== 0) {
        [this.filesArray[this.fileToRun], this.filesArray[this.fileToRun].listToShow, this.filesArray[this.fileToRun].listToPrint] = this.runProcess.runProgram(this.filesArray[this.fileToRun], this.acumulator);
        let monitor: any = document.getElementById("monitor");
        monitor.innerHTML = "";
        let listMessageToShow: string[] = [];
        for (let message of this.filesArray[this.fileToRun].listToShow) {
          listMessageToShow.push(`${message[0]}: ${message[1]}`);
        }
        monitor.innerHTML = listMessageToShow.join('<br></br>');
        let printer: any = document.getElementById("printer")
        printer.innerHTML = "";
        let listMessageToPrint: string[] = [];
        for (let message of this.filesArray[this.fileToRun].listToPrint) {
          listMessageToPrint.push(`${message[0]}: ${message[1]}`);
        }
        printer.innerHTML = listMessageToPrint.join('<br></br>');
      }
    });
  }

  loadInformation(filesArray: any[]): void {
    this.communication.showInfoEvent(filesArray);
  }

  loadInputs(inputs: number[]): void {
    this.communication.showInputs(inputs);
  }
}

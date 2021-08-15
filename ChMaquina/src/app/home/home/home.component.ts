import { Component, OnInit } from '@angular/core';
import { ProcessFileService } from '../services/process-file.service';
import { HelperService } from 'src/app/services/helper.service';
import { CommunicationService } from 'src/app/services/communication.service';
import { state } from '@angular/animations';
import { RunProcessService } from '../services/run-process.service';
import { RunStepToStepService } from '../services/run-step-to-step.service';
import { AlgorithmManagementService } from '../services/algorithm-management.service';
import { RunRoundRobinService } from '../services/run-round-robin.service';

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
  kernel: number = 0;
  memory: number = 0;
  acumulator: string = '0';
  contId: number = Number(1) + Number(this.kernel);
  buttonState: boolean = false;
  fileToRun: number = 0;
  filesControllerStsToShow: number = 1;
  filesControllerSts: number = 0;
  amountSteptoStep: number = 0;
  algorithmToUse: string = 'rr';
  quantum: number = 0;

  constructor(
    private processFile: ProcessFileService,
    private helper: HelperService,
    private communication: CommunicationService,
    private runProcess: RunProcessService,
    private step: RunStepToStepService,
    private algorithmManagement: AlgorithmManagementService,
    private runRoundRobinService: RunRoundRobinService
  ) { }

  onFileSelected(event: any) {
    this.communication.currentShowEvent.subscribe(state => {
      this.filesArray = state;
      this.contId = (this.filesArray[this.filesArray.length - 1]) != undefined ?
        +this.filesArray[this.filesArray.length - 1].fpvMemory + 1 : 1 + Number(this.kernel);
    });
    this.file = event.target.files[0];
    this.fileName = event.target.files[0].name;
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.fileLoaded = fileReader.result;
    }
    fileReader.readAsText(this.file);
    setTimeout(() => {
      this.filesArray.push(this.processFile.transformFile(this.fileLoaded, this.kernel, this.contId, this.filesArray.length, this.fileName, this.algorithmToUse));
      if (this.filesArray.length > 0) {
        this.contId = +this.filesArray[this.filesArray.length - 1].fpvMemory + 1;
      }
      if (this.filesArray[this.filesArray.length - 1].fpvMemory > this.memory) {
        this.filesArray.pop();
        alert('Capacidad de Memoria excedida');
      }
      this.loadInformation(this.filesArray);
      this.loadInputs([+this.acumulator, +this.kernel, +this.memory, +this.quantum]);
      this.filesArray = this.algorithmManagement.timeOrderer(this.filesArray);
    }, 500);
    setTimeout(() => {
      console.log(this.filesArray);
      this.filesArray = this.algorithmManagement.orderFiles(this.filesArray, this.algorithmToUse, this.quantum);
    }, 500);
  }

  getKernel(event: any): void {
    this.kernel = event.target.value;
    this.contId = Number(1) + Number(this.kernel);
  }

  getMemory(event: any): void {
    this.memory = event.target.value;
  }

  ngOnInit() {
    this.communication.currentInputs.subscribe(inputsState => {
      this.acumulator = String(inputsState[0]);
      this.kernel = Number(inputsState[1]);
      this.memory = Number(inputsState[2]);
      this.quantum = Number(inputsState[3]);
    });
    this.helper.currentShowEvent.subscribe(state => {
      if (this.memory >= 0 && this.memory <= 9999) {
        this.buttonState = state;
        this.loadInputs([+this.acumulator, +this.kernel, +this.memory, +this.quantum]);
      } else {
        alert("La memoria no puede sobrepasar el valor de 9999");
        window.location.reload();
      }
      if (this.algorithmToUse === 'rr' && this.buttonState && this.quantum === 0) {
        let quantum: string | null = prompt(`Ingrese el valor del quantum, por defecto será 5`);
        this.quantum = quantum ? Number(quantum) : 5;
        this.loadInputs([+this.acumulator, +this.kernel, +this.memory, +this.quantum]);
      }
    });
    this.helper.currentFileToRun.subscribe(value => {
      this.fileToRun = value;
      if (this.filesArray.length !== 0 && this.fileToRun < this.filesArray.length) {
        if (this.algorithmToUse === 'rr') {
          this.filesArray = this.runRoundRobinService.runRoundRobin(this.filesArray, this.acumulator, this.quantum);
        } else {
          [this.filesArray[this.fileToRun], this.filesArray[this.fileToRun].listToShow, this.filesArray[this.fileToRun].listToPrint] = this.runProcess.runProgram(this.filesArray[this.fileToRun], this.acumulator);
        }
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
    this.helper.currentAmountSteptoStep.subscribe(() => {
      if(this.filesArray.length !== 0 && this.amountSteptoStep < this.filesArray[this.filesControllerSts].codeLines.length) {
        [this.filesArray[this.filesControllerSts], this.filesArray[this.filesControllerSts].listToShow, this.filesArray[this.filesControllerSts].listToPrint, this.acumulator, this.amountSteptoStep] = this.step.stepToStep(this.filesArray[this.filesControllerSts], this.acumulator, this.amountSteptoStep);
        this.loadInputs([+this.acumulator, +this.kernel, +this.memory, +this.quantum]);
        let monitor: any = document.getElementById("monitor");
        monitor.innerHTML = "";
        let listMessageToShow: string[] = [];
        for (let message of this.filesArray[this.fileToRun].listToShow) {
          listMessageToShow.push(`${message[0]}: ${message[1]}`);
        }
        monitor.innerHTML = listMessageToShow.join('<br></br>');
        let printer: any = document.getElementById("printer");
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

  getController(event: any): void {
    this.filesControllerStsToShow = event.target.value;
    this.filesControllerSts = this.filesControllerStsToShow - 1;
  }

  getAlgorithm(event: any): void {
    this.algorithmToUse = event.target.value;
    this.filesArray = this.algorithmManagement.orderFiles(this.filesArray, this.algorithmToUse, this.quantum);
  }
}

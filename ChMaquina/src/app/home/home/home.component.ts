import { Component, OnInit } from '@angular/core';
import { ProcessFileService } from '../services/process-file.service';
import { HelperService } from 'src/app/services/helper.service';
import { CommunicationService } from 'src/app/services/communication.service';
import { state } from '@angular/animations';

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
  acumulator: number = 0;
  contId: number = 1 + this.kernel;
  buttonState: boolean = false;

  constructor(
    private processFile: ProcessFileService,
    private helper: HelperService,
    private communication: CommunicationService
  ) { }

  onFileSelected(event: any) {
    this.communication.currentShowEvent.subscribe(state => {
      this.filesArray = state;
      this.contId = (this.filesArray[this.filesArray.length - 1])!=undefined ?
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
      this.loadInputs([this.acumulator, this.kernel, this.memory]);
    }, 1000)
    setTimeout(() =>{
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
      this.buttonState = state
    });
  }

  loadInformation(filesArray: any[]): void {
    this.communication.showInfoEvent(filesArray);
  }

  loadInputs(inputs: number[]): void {
    this.communication.showInputs(inputs);
  }
}

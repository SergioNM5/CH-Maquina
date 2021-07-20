import { Component, OnInit } from '@angular/core';
import { ProcessFileService } from '../services/process-file.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  fileName: string = '';
  fileLoaded: any = '';
  file: any;
  lines: any[] = [];
  kernel: number = 19;
  memory: number = 100;
  acumulador: number = 0;
  idLines: number = 0;
  contId: number = 1+this.kernel;
  prueba: number = 1+this.kernel;
  buttonState: boolean = false;

  constructor(
    private processFile: ProcessFileService,
    private helper: HelperService
  ) { }

  onFileSelected(event: any) {

    this.file = event.target.files[0];
    this.fileName = event.target.files[0].name;
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.fileLoaded = fileReader.result;
    }
    fileReader.readAsText(this.file);
    setTimeout(() => {
      this.lines.push(this.processFile.transformFile(this.fileLoaded, this.kernel, this.contId, this.lines.length, this.fileName)); //Lamar a una funcion en el servicio que retorne instancia de fileCh bien
      console.log(this.lines);

      //each file with their id lines
      for(let i=this.idLines; i<this.lines.length; i++) {
        for(let j of this.lines[i].codeLines) {
          j.unshift(this.prueba);
          this.prueba++
        }
      }
      this.idLines++;
      console.log(this.lines);

    }, 1000)

  }

  getKernel(event: any): void {
    this.kernel = event.target.value;
  }

  getMemory(event: any): void {
    this.memory = event.target.value;
  }

  ngOnInit() {
    this.helper.currentShowEvent.subscribe(state => {
      this.buttonState = state
    });
  }
}

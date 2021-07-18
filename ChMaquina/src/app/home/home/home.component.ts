import { Component } from '@angular/core';
import { faCoffee, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { toArray } from 'rxjs/operators';
import { FileCH } from 'src/app/models/file-ch';
import { ProcessFileService } from '../services/process-file.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  fileName: string = '';
  fileCh: FileCH = new FileCH();
  file: any;
  lines: any[] = [];
  kernel: number = 0;
  memory: number = 0;
  contId: number = 0;

  constructor( private processFile: ProcessFileService ) { }

  onFileSelected(event: any) {

    this.file = event.target.files[0];
    this.fileName = event.target.files[0].name;
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.fileCh.codeLines = fileReader.result;
    }
    fileReader.readAsText(this.file);
    setTimeout(() => {
      this.lines.push(this.processFile.transformFile(this.fileCh.codeLines, this.kernel, this.contId, this.lines.length, this.fileName)); //Lamar a una funcion en el servicio que retorne instancia de fileCh bien
      console.log(this.lines);
    },1000)



  }

  getKernel(event: any): void {
    this.kernel = event.target.value;
  }

  getMemory(event: any): void {
    this.memory = event.target.value;
  }
}

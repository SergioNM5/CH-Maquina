import { Component } from '@angular/core';
import { faCoffee, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FileCH } from 'src/app/models/file-ch';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  fileName = '';
  fileCh: FileCH = new FileCH();
  file: any;

  constructor() { }

  onFileSelected(event: any) {

    this.file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
      this.fileCh.codeLines = fileReader.result;
      console.log(this.fileCh.codeLines);
    }
    fileReader.readAsText(this.file);
    console.log(this.fileCh);

    

  }
}

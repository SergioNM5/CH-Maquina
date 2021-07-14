import { Component } from '@angular/core';
import { faCoffee, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  fileName = '';
  listFileName: string [] = [];
  constructor() { }

  onFileSelected(event: any) {

    const file:File = event.target.files[0];
    console.log(file);

    if (file) {

        this.fileName = file.name;
        this.listFileName.push(this.fileName);

        console.log(this.listFileName);

    }
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProcessFileService {

  constructor() { }

  processFile(ch: any, callback: any) {
    var reader = new FileReader();
    reader.readAsText(ch);
    reader.onload = function () {
      callback(reader.result);
    }
  }

  transformFile(file: File) {
    
  }
}


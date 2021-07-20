import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileCH } from 'src/app/models/file-ch';

@Injectable({
  providedIn: 'root'
})
export class ProcessFileService {

  constructor() { }

  transformFile(contentFile: any, kernel: number, contId: number, id: number, fileName: string): any {
    let fileCh: FileCH = new FileCH;
    fileCh._id = this.zeroFill(String(id), 4);
    fileCh._name = fileName;

    let listLines: any[] = contentFile.split('\n');
    // loop for clean the spaces in the file lines
    for (let i=0; i<listLines.length; i++) {
      listLines[i] = listLines[i].trim();
      listLines[i] = listLines[i].split(' ');
    }

    // Clean the void slots and comments
    for (let j=0; j<listLines.length; j++) {
      if (listLines[j] === '' || listLines[j] === undefined || listLines[j].length === 1 ) {
        listLines.splice(j,1);
        j--;
      } else if (listLines[j].includes('//')) {
        listLines.splice(j,1);
        j--;
      }
    }

    // Clean any space in lines of the slots
    for (let i = 0; i < listLines.length; i++) {
      for (let j = 0; j < listLines[i].length; j++) {
        if (listLines[i][j] === '') {
          listLines[i].splice(j,1)
          j--;
        }
      }
    }

    fileCh._amountInst = listLines.length;
    fileCh.codeLines = listLines;
    fileCh.ipMemory = this.zeroFill(String(contId), 4);

    return fileCh;
  }

  zeroFill(number: string, width: number) {
    width -= number.toString().length;
    if (width > 0) {
      return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
    }
    return number + ""; // siempre devuelve tipo cadena
  }
}

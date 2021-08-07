import { variable } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { FileCH } from 'src/app/models/file-ch';
import { Tag } from 'src/app/models/tag';
import { Variable } from 'src/app/models/variables';
import { CheckSyntaxService } from './check-syntax.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessFileService {

  constructor(
    private checkSyntax: CheckSyntaxService
  ) { }

  transformFile(contentFile: any, kernel: number, contId: number, id: number, fileName: string): FileCH | void {
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
    fileCh.codeLines = <string[]>listLines;
    fileCh.ipMemory = this.zeroFill(String(contId), 4);
    fileCh.fpMemory = this.zeroFill(String((fileCh._amountInst - 1) + (+contId)), 4);

    let resultSyntax: [Tag[], Variable[], string[]] = this.checkSyntax.checkSyntax(fileCh.codeLines);

    fileCh.tags = resultSyntax[0];
    fileCh.variables = resultSyntax[1];
    fileCh.fpvMemory = this.zeroFill(String(+fileCh.fpMemory + fileCh.variables.length), 4);

    for (let tag of fileCh.tags) {
      tag.id = fileCh._id;
    }
    for (let variable of fileCh.variables) {
      variable.id = fileCh._id;
    }

    if (resultSyntax[2].length > 0) {
      for (let err = 0; err < resultSyntax[2].length; err++) {
        alert(resultSyntax[2][err]);
      }
    } else {
      return fileCh;
    }
  }

  zeroFill(number: string, width: number) {
    width -= number.toString().length;
    if (width > 0) {
      return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
    }
    return number + ""; // siempre devuelve tipo cadena
  }
}

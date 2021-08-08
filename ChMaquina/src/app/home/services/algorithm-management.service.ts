import { Injectable } from '@angular/core';
import { FileCH } from 'src/app/models/file-ch';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmManagementService {

  constructor() { }

  orderFiles(filesArray: FileCH[], algorithmToUse: string): FileCH[] {

    let orderedFilesArray: FileCH[] = [];

    if (algorithmToUse === 'fcfs') {

      orderedFilesArray.push(filesArray[0]);

      for (let i = 1; i < filesArray.length; i++) {

        if (Number(filesArray[i]._id) < Number(orderedFilesArray[0]._id)) {
          orderedFilesArray.unshift(filesArray[i]);
        } else {
          orderedFilesArray.push(filesArray[i]);
        }

      }

    } else if (algorithmToUse === 'sjf') {

      orderedFilesArray.push(filesArray[0]);

      for (let i = 1; i < filesArray.length; i++) {

        if (filesArray[i].codeLines.length < orderedFilesArray[0].codeLines.length) {
          orderedFilesArray.unshift(filesArray[i]);
        } else {
          orderedFilesArray.push(filesArray[i]);
        }

      }

    } else if (algorithmToUse === 'srtn') {

      orderedFilesArray.push(filesArray[0]);

      for (let i = 1; i < filesArray.length; i++) {

        if (filesArray[i].codeLines.length < orderedFilesArray[0].codeLines.length) {
          orderedFilesArray.unshift(filesArray[i]);
        } else {
          orderedFilesArray.push(filesArray[i]);
        }

      }

    }

  }

}

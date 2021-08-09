import { Injectable } from '@angular/core';
import { FileCH } from 'src/app/models/file-ch';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmManagementService {

  constructor() { }

  // orderFiles(filesArray: FileCH[], algorithmToUse: string): FileCH[] {

  //   let orderedFilesArray: FileCH[] = [];

  //   if (algorithmToUse === 'fcfs') {

  //     orderedFilesArray.push(filesArray[0]);

  //     for (let i = 1; i < filesArray.length; i++) {

  //       if (Number(filesArray[i]._id) < Number(orderedFilesArray[0]._id)) {
  //         orderedFilesArray.unshift(filesArray[i]);
  //       } else {
  //         orderedFilesArray.push(filesArray[i]);
  //       }

  //     }

  //   } else if (algorithmToUse === 'sjf') {

  //     orderedFilesArray.push(filesArray[0]);

  //     for (let i = 1; i < filesArray.length; i++) {

  //       if (filesArray[i].codeLines.length < orderedFilesArray[0].codeLines.length) {
  //         orderedFilesArray.unshift(filesArray[i]);
  //       } else {
  //         orderedFilesArray.push(filesArray[i]);
  //       }

  //     }

  //   } else if (algorithmToUse === 'srtn') {

  //     // missing implementation

  //   } else if (algorithmToUse === 'rr') {



  //   } else if (algorithmToUse === 'priority') {

  //     orderedFilesArray.push(filesArray[0]);

  //     for (let i = 1; i < filesArray.length; i++) {
  //       for (let j = 0; j < orderedFilesArray.length; j++) {

  //         if (filesArray[i].priority > orderedFilesArray[j].priority) {
  //           orderedFilesArray[j] = (filesArray[i]);
  //         }

  //       }

  //     }

  //   }

  //   return orderedFilesArray;

  // }

  timeOrderer(filesArray: FileCH[]): FileCH[] {

    if (filesArray.length === 1) {

      filesArray[0].arrivalTime = 0;

    } else {

      for (let i = 1; i < filesArray.length; i++) {

        filesArray[i].arrivalTime = Number(((filesArray[i - 1].arrivalTime + Number(filesArray[i - 1]._amountInst)) / 4).toFixed(3));

      }

    }

    return filesArray;

  }

}

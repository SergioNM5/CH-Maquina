import { Injectable } from '@angular/core';
import { FileCH } from 'src/app/models/file-ch';

@Injectable({
  providedIn: 'root',
})
export class AlgorithmManagementService {
  constructor() { }

  orderFiles(filesArray: FileCH[], algorithmToUse: string, quantum: number, contId: number): [FileCH[], number] {

    let contId2: number = contId;

    if (algorithmToUse === 'fcfs') {
      filesArray = filesArray.sort((a, b) => Number(a._id) - Number(b._id));

    } else if (algorithmToUse === 'sjf') {
      filesArray = filesArray.sort((a, b) => Number(a._id) - Number(b._id));

      contId2 = +filesArray[filesArray.length - 1].fpvMemory + 1;

      filesArray = filesArray.sort(
        (a, b) => Number(a._amountInst) - Number(b._amountInst)
      );
    } else if (algorithmToUse === 'srtn') {

      let filesArrayFake = filesArray.sort((a, b) => Number(a._id) - Number(b._id));

      contId2 = +filesArrayFake[filesArrayFake.length - 1].fpvMemory + 1;

    } else if (algorithmToUse === 'rr') {

      for (let file of filesArray) {
        file.endingRr = quantum;
      }

      let filesArrayFake = filesArray.sort((a, b) => Number(a._id) - Number(b._id));

      contId2 = +filesArrayFake[filesArrayFake.length - 1].fpvMemory + 1;

    } else if (algorithmToUse === 'rrPriority') {

      filesArray = filesArray.sort((a, b) => Number(a._id) - Number(b._id));

      contId2 = +filesArray[filesArray.length - 1].fpvMemory + 1;

      filesArray = filesArray.sort(
        (a, b) => Number(b.priority) - Number(a.priority)
      );

      for (let file of filesArray) {
        file.endingRr = quantum;
      }

    } else if (algorithmToUse === 'priority') {

      filesArray = filesArray.sort((a, b) => Number(a._id) - Number(b._id));

      contId2 = +filesArray[filesArray.length - 1].fpvMemory + 1;

      filesArray = filesArray.sort(
        (a, b) => Number(b.priority) - Number(a.priority)
      );
    }

    return [filesArray, contId2];
  }

  timeOrderer(filesArray: FileCH[]): FileCH[] {
    if (filesArray.length === 1) {
      filesArray[0].arrivalTime = 0;
    } else {
      for (let i = 1; i < filesArray.length; i++) {
        filesArray[i].arrivalTime = Number(((filesArray[i - 1].arrivalTime + Number(filesArray[i - 1]._amountInst)) / 4).toFixed(0));
      }
    }

    return filesArray;
  }
}

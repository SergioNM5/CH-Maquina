import { Tag } from "./tag";
import { Variable } from "./variables";


export class FileCH {
  _id: string = '';
  _name: string = '';
  // instructions amount
  _amountInst: number = 0;
  // initial position in memory
  ipMemory: string = '';
  // final position in memory
  fpMemory: string = '';
  // final position with variables in memory
  fpvMemory: string = '';
  // final position with variables in memory
  codeLines: string[] = [];
  tags: Tag[] = [];
  variables: Variable[] = [];
  // list to show
  listToShow: any[] = [];
  // list to print
  listToPrint: any[] = [];
  // burst I/O
  burstIO: number = 0;
  // burst CPU
  burstCPU: number = 0;
  // arrival time
  arrivalTime: number = 0;
  // priority
  priority: number = 0;
  // initial for rr
  initialRr: number = 0;
  // ending for rr
  endingRr: number = 0;
  // slice (Q)
  slice: number = 0;

  constructor() {
  }
}

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

  constructor() {
  }
}

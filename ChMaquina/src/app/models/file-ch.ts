import { variables } from "../info/info/info.component";
import { Tag } from "./tag";


export class FileCH {
  _id: string = '';
  _name: string = '';
  // instructions amount
  _amountInst: number = 0;
  // initial position in memory
  ipMemory: number = 0;
  // final position in memory
  fpMemory: number = 0;
  // final position with variables in memory
  fpvMemory: number = 0;
  // final position with variables in memory
  codeLines: any = '';
  tags: Tag[] = [];
  variables: variables[] = [];

  constructor() {
  }
}

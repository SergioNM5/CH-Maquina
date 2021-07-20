import { variables } from "../info/info/info.component";
import { Tag } from "./tag";


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
  codeLines: any = '';
  tags: Tag[] = [];
  variables: variables[] = [];

  constructor() {
  }
}

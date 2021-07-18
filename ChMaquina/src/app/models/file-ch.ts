import { variables } from "../info/info/info.component";
import { Tag } from "./tag";


export class FileCH {
  _id: number = 0;
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
  codeLines: string | ArrayBuffer | null = '';
  tags: Tag[] = [];
  variables: variables[] = [];

  constructor() {
  }
}

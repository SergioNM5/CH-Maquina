import { Component, OnInit } from '@angular/core';

export interface documentLines {
  position: number;
  content: string;
}

export interface variables {
  id: number;
  value: string;
}

export interface tags {
  id: number;
  value: string;
}

const DATA: documentLines[] = [
  {position: 1, content: 'Line 1'},
  {position: 2, content: 'Line 2'}
]

const DATA_VARIABLES: variables[] = [
  {id: 1, value: 'v1'},
  {id: 2, value: 'v2'},
]

const DATA_TAGS: tags[] = [
  {id: 1, value: 't1'},
  {id: 2, value: 't2'},
]

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  displayedColumns: string[] = ['position', 'content'];
  dataSource = DATA;

  columnsVar: string[] = ['id', 'value'];
  dataVar = DATA_VARIABLES;

  columnsTag: string[] = ['id', 'value'];
  dataTag = DATA_TAGS;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  filesArray: any[] = [];
  DATA: any[] = [];
  DATA_TAGS: any[] = [];
  DATA_VARIABLES: any[] = [];

  displayedColumns: string[] = ['id','name','amountInst','ipMemory','fpMemory','fpvMemory'];
  dataSource = this.DATA;

  columnsTag: string[] = ['id', 'name', 'value'];
  dataTag = this.DATA_TAGS;

  columnsVar: string[] = ['id', 'name', 'value'];
  dataVar = this.DATA_VARIABLES;

  constructor(
    private communication: CommunicationService
  ) { }

  ngOnInit() {
    this.communication.currentShowEvent.subscribe(state => {
      this.filesArray = state
      for (let file of this.filesArray) {
        let information = {
          id: file._id,
          name: file._name,
          amountInst: file._amountInst,
          ipMemory: file.ipMemory,
          fpMemory: file.fpMemory,
          fpvMemory: file.fpvMemory
        };
        for (let fileTag of file.tags) {
          let tag = {
            id: fileTag.id,
            name: fileTag.name,
            value: fileTag.value
          }
          this.DATA_TAGS.push(tag);
        };
        for (let fileVar of file.variables) {
          let variable = {
            id: fileVar.id,
            name: fileVar.name,
            value: fileVar.value
          }
          this.DATA_VARIABLES.push(variable);
        };

        this.DATA.push(information);
      }
    });
  }
}

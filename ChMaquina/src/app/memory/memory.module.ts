import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemoryRoutingModule } from './memory-routing.module';
import { MemoryComponent } from './memory/memory.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [MemoryComponent],
  imports: [
    CommonModule,
    MemoryRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class MemoryModule { }

import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule, MatDialogContent, MatButtonModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [
    DeleteDialogComponent
  ],
  entryComponents: [
    DeleteDialogComponent
  ]
})
export class DialogModule { }

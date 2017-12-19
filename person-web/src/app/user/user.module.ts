import { UserService } from './user.service';
import { MatIconModule, MatTooltipModule } from '@angular/material';
import { UserRoutingModule } from './user-routing.module';
import { ToolbarModule } from './../toolbar/toolbar.module';
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    ToolbarModule,
    MatIconModule,
    MatTooltipModule
  ],
  declarations: [
    UserComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }

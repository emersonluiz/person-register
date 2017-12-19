import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatIconModule,
    FormsModule,
    MatCardModule,
    /*MatTooltipModule,
    DialogModule,*/
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    AuthComponent
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }

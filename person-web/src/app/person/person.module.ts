import { MyDateAdapter, MY_DATE_FORMATS } from './../utils/date-util';
import { UserModule } from './../user/user.module';
import { State } from './../utils/state';
import { DialogModule } from './../dialog/dialog.module';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule, MatCardModule, MatIconModule, 
         MatButtonModule, MatSelectModule, MatFormFieldModule, 
         MatInputModule, MatTabsModule, MatListModule, MatRadioModule,
         MatDatepickerModule, MatNativeDateModule, MatExpansionModule,
         MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter
        } from '@angular/material';

import { ToolbarModule } from './../toolbar/toolbar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonComponent } from './person.component';
import { PersonRoutingModule } from './person-routing.module';
import { PersonService } from './person.service';
import { PersonRegisterComponent } from './person-register/person-register.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { PersonSearchComponent } from './person-search/person-search.component';

@NgModule({
  imports: [
    CommonModule,
    PersonRoutingModule,
    ToolbarModule,
    MatIconModule,
    FormsModule,
    MatCardModule,
    MatTooltipModule,
    DialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatListModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    UserModule
  ],
  declarations: [
    PersonComponent,
    PersonRegisterComponent,
    PersonDetailComponent,
    PersonSearchComponent
  ],
  providers: [
    PersonService,
    State
  ]
})
export class PersonModule { }
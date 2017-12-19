import { PersonSearchComponent } from './person-search/person-search.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonComponent } from './person.component';
import { PersonRegisterComponent } from './person-register/person-register.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';

const personRoutes: Routes = [
    { path:'', component: PersonComponent },
    { path:'add', component: PersonRegisterComponent },
    { path:'search', component: PersonSearchComponent },
    { path:':id', component: PersonRegisterComponent },
    { path:':id/detail', component: PersonDetailComponent }
]

@NgModule({
    imports: [RouterModule.forChild(personRoutes)],
    exports: [RouterModule]
})
export class PersonRoutingModule { }

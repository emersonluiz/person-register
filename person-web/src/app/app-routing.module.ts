import { AuthGuard } from './auth/auth.guard';
import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
/*
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
*/
const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/auth/auth.module#AuthModule'
    //component:LoginComponent 'app/login/login.module#LoginModule'
  },
  {
    path: 'person',
    loadChildren: 'app/person/person.module#PersonModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    loadChildren: 'app/user/user.module#UserModule',
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

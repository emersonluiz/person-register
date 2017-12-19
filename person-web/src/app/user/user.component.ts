import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {

  person: string;
  userName: string;
  personId: string;
  dateLogin: any;

  constructor(private authService: AuthService,
              private router: Router) {
    let user = authService.getUser();
    this.userName = user.username;
    this.person = user.name;
    this.personId = user.id;
    this.dateLogin = user.date;
  }

  ngOnInit() {
  }

  onPerson() {
    this.router.navigate(['person', this.personId, 'detail']);
  }
}

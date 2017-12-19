import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onPersonSearch() {
    this.router.navigate(['person','search']);
  }

  onPerson() {
    this.router.navigate(['person']);
  }

  onUser() {
    this.router.navigate(['user']);
  }
}

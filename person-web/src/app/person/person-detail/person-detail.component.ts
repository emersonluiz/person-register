import { UserService } from './../../user/user.service';
import { PersonService } from './../person.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {

  person: any = {};
  stockout: any = [];
  user = {
    user: null
  }

  constructor(private router: Router, 
              private route: ActivatedRoute,
              private personService: PersonService,
              private userService: UserService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: any) => {
        let id = params["id"];

        if (id !== undefined && id !== '') {
          this.loadPerson(id);
        }
      }
    );
  }

  loadPerson(id: string) {
    this.personService.get(id).subscribe(
      rtn => {
        this.userService.get(id).subscribe(
          us => {
            this.user.user = us.user;
          }
        );

        this.person = rtn;
      }
    );
  }

  onClose() {
    this.router.navigate(['person']);
  }
}

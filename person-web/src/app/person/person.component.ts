import { DeleteDialogComponent } from './../dialog/delete-dialog/delete-dialog.component';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Component, OnInit, Inject, HostListener } from '@angular/core';

import { MatDialog } from '@angular/material';

import { PersonService } from './person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  persons: any = [];
  page: number = 1;
  totalPage: number = null;
  loading: boolean = false;

  constructor(private router: Router,
              private personService: PersonService,
              public dialog: MatDialog,
              @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.list(this.page);
  }

  list(page) {
    if(!this.loading) {
      this.personService.list(page, null).subscribe(
        rtn => {
          this.totalPage = rtn.pages;
          this.loading = false;
          this.persons = this.persons.concat(rtn.docs);
        }
      );
    }
  }

  onAdd() {
    this.router.navigate(['person', 'add']);
  }

  onEdit(id: string) {
    this.router.navigate(['person', id]);
  }

  onDetail(id: string) {
    this.router.navigate(['person', id, 'detail']);
  }

  onDelete(id: string) {
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'true') {
        this.personService.delete(id).subscribe(
          rtn => {
            this.persons = [];
            this.list(this.page);
          }
        );
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll($event: Event): void {

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if(this.totalPage > this.page) {
        this.page++;
        this.list(this.page);
        this.loading = true;
      }
    }
  }

}

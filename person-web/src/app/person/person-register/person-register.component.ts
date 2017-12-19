import { UserService } from './../../user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { PersonService } from './../person.service';
import { State } from './../../utils/state';

import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-person-register',
  templateUrl: './person-register.component.html',
  styleUrls: ['./person-register.component.css']
})
export class PersonRegisterComponent implements OnInit {

  person = {
    id:null, name:null, company:null, 
    birth:null, address:null, city:null, postalCode:null,
    phone:null, phoneMobile:null, phoneBusiness:null, phoneOther:null,
    email:null, emailBusiness:null, emailOther:null,
    state:null
  };
  user = {
    id:null, user: null, password:null
  }
  states: any = [];

  constructor(private router: Router, 
              private route: ActivatedRoute,
              private personService: PersonService,
              private userService: UserService,
              private state: State) {
                this.states = state.states;
               }

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

  isValid() {
    if(this.person.name === '' || 
       this.person.name === undefined || 
       this.person.name === null) {
         return true;
       }
    return false;
  }

  clear() {
    this.person = {
      id:null, name:null, company:null,  
      birth:null, address:null, city:null, postalCode:null,
      phone:null, phoneMobile:null, phoneBusiness:null, phoneOther:null,
      email:null, emailBusiness:null, emailOther:null,
      state:null
    };
    this.user = {
      id:null, user: null, password:null
    }
  }

  loadPerson(id: string) {
    this.personService.get(id).subscribe(
      rtn => {
        this.userService.get(id).subscribe(
          us => {
            this.user.id = us.id;
            this.user.user = us.user;
          }
        );

        this.person.id = rtn.id;
        this.person.name = rtn.name;
        this.person.birth = ((rtn.birthDate !== null) ? new Date(rtn.birthDate) : null);
        if(rtn.addresses !== null) {
          if(rtn.addresses.length > 0) {
            this.person.address = rtn.addresses[0].address;
            this.person.city = rtn.addresses[0].city;
            this.person.postalCode = rtn.addresses[0].zipcode;
            this.person.state = rtn.addresses[0].state;
          }
        }

        if(rtn.phones !== null) {
          rtn.phones.forEach(item => {
            switch (item.type) {
              case "Fixo":
                this.person.phone = item.number;
                break;

              case "Celular":
                this.person.phoneMobile = item.number;
                break;

              case "Comercial":
                this.person.phoneBusiness = item.number;
                break;

              case "Outro":
                this.person.phoneOther = item.number;
                break;
            }
          });
        }

        if(rtn.emails !== null) {
          rtn.emails.forEach(item => {
            switch (item.type) {
              case "Particular":
                this.person.email = item.email;
                break;

              case "Comercial":
                this.person.emailBusiness = item.emailBusiness;
                break;

              case "Outro":
                this.person.emailOther = item.emailOther;
                break;
            }
          });
        }
      }
    );
  }

  onClose() {
    this.router.navigate(['person']);
  }

  onDelete(item: any, list: any[]) {
    let el: number = null
    
    for(let i=0; i<list.length; i++) {
      if(list[i] === item) {
        el = i;
        break;
      }
    }
    if(el !== null) {
      list.splice(el, 1);
    }

  }

  onBlurZipcode() {
    this.personService.getZipcode(this.person.postalCode).subscribe(
      rtn => {
        console.log("Endereço", rtn);
        if(!("erro" in rtn)) {

          if(rtn.logradouro) {
            this.person.address = rtn.logradouro;
          } else {
            this.person.address = "";
          }

          if(rtn.bairro !== "") {
            this.person.address += ", " + rtn.bairro;
          }

          if(rtn.cidade !== "") {
            this.person.city = rtn.localidade;
          } else {
            this.person.city = "";
          }

          if(rtn.uf !== "") {
            this.states.forEach(item => {
              if(item.isoCode === rtn.uf) {
                this.person.state = item.name;
              }
            });
          } else {
            this.person.state = "";
          }
        }
      }
    );
  }

  onSave() {
    let person = {name: this.person.name, 
      birthDate:this.person.birth,
      emails:[],
      phones:[],
      addresses:[]
    };

    if(this.person.address !== null || this.person.city !== null || this.person.postalCode !== null) {
      person.addresses.push({
        address: this.person.address, 
        city: this.person.city, 
        zipcode: this.person.postalCode,
        state: null
      })
      if(this.person.state != null) {
        person.addresses[0].state = this.person.state
      }
    }

    if(this.person.phone !== null) {
      person.phones.push({number:this.person.phone, type:'Fixo'});
    }

    if(this.person.phoneMobile !== null) {
      person.phones.push({number:this.person.phoneMobile, type:'Celular'});
    }

    if(this.person.phoneBusiness !== null) {
      person.phones.push({number:this.person.phoneBusiness, type:'Comercial'});
    }

    if(this.person.phoneOther !== null) {
      person.phones.push({number:this.person.phoneOther, type:'Outro'});
    }

    if(this.person.email !== null) {
      person.emails.push({email:this.person.email, type:'Particular'});
    }

    if(this.person.emailBusiness !== null) {
      person.emails.push({email:this.person.emailBusiness, type:'Comercial'});
    }

    if(this.person.emailOther !== null) {
      person.emails.push({email:this.person.emailOther, type:'Outro'});
    }

    if(this.person.id != null) {
      this.personService.update(this.person.id, person).subscribe(
        rtn => {
          console.log("Updated", rtn);

          if(this.user.user !== null && this.user.user !== undefined && this.user.user !== "") {

            if(this.user.id !== null && this.user.id !== undefined && this.user.id !== "") {
              this.userService.update(this.person.id, this.user.id, {user:this.user.user, password:this.user.password}).subscribe(
                us => {
                  this.clear();
                  this.router.navigate(['person']);
                }
              )
            } else {
              if(this.user.user !== null && this.user.user !== undefined && this.user.user !== "") {
               // if(this.user.password !== null && this.user.password !== undefined && this.user.password !== "") {
                  this.userService.create(this.person.id, {user:this.user.user, password:this.user.password}).subscribe(
                    us => {
                      this.clear();
                      this.router.navigate(['person']);
                    }
                  )
               // } else {
                  //this.clear();
                  //this.router.navigate(['person']);
               // }
              } else {
                this.clear();
                this.router.navigate(['person']);
              }
            }
          }

          this.clear();
          this.router.navigate(['person']);
        }
      );
    } else {
      this.personService.create(person).subscribe(
        rtn => {
          console.log("Created", rtn);

          if(this.user.user !== null || this.user.user !== undefined || this.user.user !== "") {
            if(this.user.password !== null && this.user.password && undefined && this.user.password !== "") {
              this.userService.create(rtn.id, {user:this.user.user, password:this.user.password}).subscribe(
                rtn => {
                  this.clear();
                  this.router.navigate(['person']);
                }
              )
            } else  {
              this.clear();
              this.router.navigate(['person']);
            }
          } else  {
            this.clear();
            this.router.navigate(['person']);
          }
        }
      );
    }
  }
}

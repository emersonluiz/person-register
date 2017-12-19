import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfigService } from './../app-config.service';
import { CookieService } from './../cookie/cookie.service';
import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {

  private tokenRequest:any
  private authUrl: string

  constructor(private http: Http,
              private cookieService:CookieService,
              private appConfig: AppConfigService) {
    this.authUrl = this.appConfig.baseUrl + this.appConfig.authUrl
    
  }

  isAuthenticated(): boolean {
    if(this.cookieService.getCookie('token')) {
        return true;
    } else {
        return false;
    }
  }

  login(username: string, password: string) {

      let headers = new Headers();
      headers.append('Authorization', ('Basic ' + username + ':' + password));
      // headers.append('Authorization', 'Basic ' + btoa(username + ':' + password))
  
      let opt = new RequestOptions();
      opt.headers = headers;

      return this.http.post(this.authUrl, null, opt).map(res => {
                var data = this.extractData(res);
                this.cookieService.setCookie('username', data.person.userName);
                this.cookieService.setCookie('name', data.person.name);
                this.cookieService.setCookie("id", data.person.id)
                this.cookieService.setCookie('token', data.token);
                this.cookieService.setCookie('date', data.date);
                return data;
            })
            .catch(error => this.handleError(error))
  }

  logout() {
    this.cookieService.deleteCookie('id');
    this.cookieService.deleteCookie('date');
    this.cookieService.deleteCookie('username');
    this.cookieService.deleteCookie('token');
  }

  getUser() {
    return {id: this.cookieService.getCookie('id'), date: this.cookieService.getCookie('date'), name: this.cookieService.getCookie('name'), username: this.cookieService.getCookie('username')}
  }

  extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      console.log(res.status)
      throw new Error('Bad response status: ' + res.status)
    }
    if(res.text().length === 0) {
        return { }
    }
    let body = res.json()
    return body || { }
}

handleError (error: any) {
  let errMsg = error.message || 'Server error'
  console.error(errMsg)
  return Observable.throw({error:errMsg, status:error.status})
}

}

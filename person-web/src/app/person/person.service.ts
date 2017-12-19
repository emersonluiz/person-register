import { Injectable } from '@angular/core';

import { HttpService } from './../http/http.service';
import { AppConfigService } from './../app-config.service';

@Injectable()
export class PersonService {

  private url: string;
  
  constructor(private httpService: HttpService,
              private appService: AppConfigService) {
    this.url = this.appService.baseUrl
  }

  create(data: any) {
    return this.httpService.post(this.url + this.appService.personUrl, data)
            .map(res => this.httpService.extractData(res))
            .catch(error => this.httpService.handleError(error))
  }

  get(id: string) {
    return this.httpService.get(this.url + this.appService.personUrl + "/" + id)
            .map(res => this.httpService.extractData(res))
            .catch(error => this.httpService.handleError(error))
  }

  delete(id: string) {
    return this.httpService.delete(this.url + this.appService.personUrl + '/' + id)
            .map(res => this.httpService.extractData(res))
            .catch(error => this.httpService.handleError(error))
  }

  update(id: string, data: any) {
    return this.httpService.put(this.url + this.appService.personUrl + '/' + id, data)
            .map(res => this.httpService.extractData(res))
            .catch(error => this.httpService.handleError(error))
  }

  list(page: number, name: string) {
    let params: string = '?page=' + page + '&size=10';

    if(name !== null && name !== "" && name !== undefined) {
      params += "&name=" + name;
    }

    return this.httpService.get(this.url + this.appService.personUrl + params)
            .map(res => this.httpService.extractData(res))
            .catch(error => this.httpService.handleError(error))
  }

  getZipcode(zipcode: string) {
    return this.httpService.get(this.appService.zipcodeUrl + "/" + zipcode + "/json")
            .map(res => this.httpService.extractData(res))
            .catch(error => this.httpService.handleError(error))
  }

}

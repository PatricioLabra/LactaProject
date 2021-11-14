import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiClass } from './api.class';

@Injectable({
  providedIn: 'root'
})
export class ApiGetService extends ApiClass {

  constructor(http: HttpClient) {
    super(http);
  }
}

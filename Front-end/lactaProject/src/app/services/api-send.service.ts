import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreModule } from '@core/core.module';
import { ApiClass } from './api.class';

@Injectable({
  providedIn: CoreModule
})
export class ApiSendService extends ApiClass {

  constructor(http: HttpClient) {
    super(http);
  }

}

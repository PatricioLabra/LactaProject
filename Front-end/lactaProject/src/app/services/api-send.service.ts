import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreModule } from '@core/core.module';
import { ApiClass } from './api.class';
import { Observable } from 'rxjs';
import { ApiResponse } from '@interfaces/api_response';
import { typeMother } from '@interfaces/mother';

@Injectable({
  providedIn: CoreModule
})
export class ApiSendService extends ApiClass {

  constructor(http: HttpClient) {
    super(http);
  }

  /**
   * Agrega una nueva madra al sistema
   * @param motherInfo Informacion de la nueva madra a agregar
   */
  public addMother(motherInfo: typeMother): Observable<ApiResponse> {
    const url: string = this.makeUrl(['mother']);
    return this.http.post<ApiResponse>(url, motherInfo);
  }
}

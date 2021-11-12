import { Injectable } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: CoreModule
})
export class ApiSendService {

  API_URL = environment.API_URL;

  constructor() { }

  /**
   * Crea una url hacia la api, con los parametros ingresados
   * @param listParams Lista de parametros de la url
   * @returns url hacia la api con los parametros correspondientes 
   */
  makeUrl(listParams: Array<string | number>): string {
    const params = listParams.join('/');
    const url = `${this.API_URL}/${params}`;
    return url;
  }
}

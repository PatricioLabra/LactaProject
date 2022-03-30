import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

export class ApiClass {

  private readonly API_URL: string = environment.API_URL;

  constructor(protected http: HttpClient) { }

  /**
   * Crea una url hacia la api, con los parametros ingresados
   * @param listParams Lista de parametros de la url
   * @returns url hacia la api con los parametros correspondientes 
   */
  protected makeUrl(listParams: Array<string | number>): string {
    const params = listParams.join('/');
    const url = `${this.API_URL}/${params}`;
    return url;
  }
}

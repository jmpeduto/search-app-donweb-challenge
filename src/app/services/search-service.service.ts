import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class SearchServiceService {
  // Fake API URL
  //en proxy.conf.json equivale a "target": "http://138.36.238.131:50074/api/getAllCategorias",
  url: string = 'http://localhost:4200/api';
  public listado:string[] = ["listado"];

  constructor(private http: HttpClient) {}

  getAllCategorias(): any {
    this.listado = ["listado"];
    return this.http.post(this.url, '');
  }

  someMethod() {
    return this.http.get(this.url).pipe(map(res => {
       return res;
    }));
 }
}

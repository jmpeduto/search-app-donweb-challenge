import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Categoria } from '../interfaces/categoria.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchServiceService {
  // Fake API URL
  //en proxy.conf.json equivale a "target": "http://138.36.238.131:50074/api/getAllCategorias",
  url: string = 'http://localhost:4200/api';
  public listado:Categoria[] = [];
  private listadoSource:any = new  BehaviorSubject(this.listado);
  currentListado$ = this.listadoSource.asObservable();

  constructor(private http: HttpClient) {
      
  }

   getAllCategorias() {
    this.http.post(this.url, '').subscribe( (res:any) => this.listadoSource.next(res.data));
  }

  someMethod() {
    return this.http.get(this.url).pipe(
      map((res) => {
        return res;
      })
    );
  }
}

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

  searchListado(searchText:string){
    let listadoAux:any[] = [];
    console.log(searchText);
    this.http.post(this.url, '').subscribe( (res:any) => {
      res.data.forEach((producto:any) => {
        if (producto.nombre.toLowerCase().includes(searchText.toLowerCase())) {
          listadoAux.push(producto);
        }
      }),

      this.listadoSource.next(listadoAux);
    });

    // this.currentListado$.subscribe(
    //   (listado:any) => (
    //     listado.filter((it:any) => {
    //       return it.nombre.toLocaleLowerCase().includes(searchText);
    //     })),
    //     console.log(this.listado);
    //     );
    // items.filter(it => {
    //   return it.nombre.toLocaleLowerCase().includes(searchText);
    // });
  }

  someMethod() {
    return this.http.get(this.url).pipe(
      map((res) => {
        return res;
      })
    );
  }
}

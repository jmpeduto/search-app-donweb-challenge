import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { donwebApiRoutes } from '../api.donweb.routes';
import { Plan } from '../interfaces/plan';

@Injectable({
  providedIn: 'root',
})
export class SearchServiceService {
  // Fake API URL
  //en proxy.conf.json equivale a "target": "http://138.36.238.131:50074/api/getAllCategorias",
  // url: string = 'http://localhost:4200/';
  // url: string = 'http://localhost:4200/';
  // url: string = 'http://localhost:4200/';
  // url: string = 'http://localhost:4200/';
  public listado: Plan[] = [];
  private listadoSource: any = new BehaviorSubject(this.listado);
  currentListado$ = this.listadoSource.asObservable();
  cargadoListado: boolean = false;

  constructor(private http: HttpClient) {
    this.getListado();
  }

  //  getAllCategorias() {
  //   this.http.post(this.url, '').subscribe( (res:any) => this.listadoSource.next(res.data));
  // }

  getListado() {
    let listadoAux: Plan[] = [];
    this.http.post(donwebApiRoutes.getListado, '').subscribe((res: any) => {
      listadoAux = res.response.planes;
      // console.log(res);
      this.listadoSource.next(listadoAux);
      this.cargadoListado = true;
    });
  }

  removeItem() {}

  searchListado(searchText: string) {
    let listadoAux: Plan[] = [];
    console.log(searchText);
    this.http.post(donwebApiRoutes.getListado, '').subscribe((res: any) => {
      res.response.planes.forEach((plan: Plan) => {
        if (plan.plan.toLowerCase().includes(searchText.toLowerCase())) {
          listadoAux.push(plan);
        }
      }),
        this.listadoSource.next(listadoAux);
      this.cargadoListado = true;
    });
  }

  // someMethod() {
  //   return this.http.get(this.url).pipe(
  //     map((res) => {
  //       return res;
  //     })
  //   );
  // }
}

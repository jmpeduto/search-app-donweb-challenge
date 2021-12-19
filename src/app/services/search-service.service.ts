import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { donwebApiRoutes } from '../api.donweb.routes';
import { Plan } from '../interfaces/plan';
import * as express from 'express';
import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';


@Injectable({
  providedIn: 'root',
})
export class SearchServiceService {
  
  private httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };

  
  public listado: Plan[] = [];
  private listadoSource: any = new BehaviorSubject(this.listado);
  currentListado$ = this.listadoSource.asObservable();
  cargadoListado: boolean = false;
  
  constructor(private http: HttpClient) {
    this.getListado();
  //   let app = express();
  
  //   app.use('/getListado', createProxyMiddleware({ target: 'http://c1300044.ferozo.com/getListado.php', changeOrigin: true }));
  //   app.listen(3000);
  }
  
  llamadaPruebaCors(){
    const headers = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' };
    const body = {  };
    this.http.post<any>('http://138.36.238.131:50074/api/getProductos', body,this.httpOptions ).subscribe(data => {
        // this.postId = data.id;
        
    });
  }

  getListado() {
    let listadoAux: Plan[] = [];
    this.http.post(donwebApiRoutes.getListado, '').subscribe((res: any) => {
      listadoAux = res.response.planes;
      // 
      this.listadoSource.next(listadoAux);
      this.cargadoListado = true;
    });
  }

  removeItem() {}

  searchListado(searchText: string) {
    let listadoAux: Plan[] = [];
    
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

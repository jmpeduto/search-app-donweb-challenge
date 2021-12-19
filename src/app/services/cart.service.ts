import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { donwebApiRoutes } from '../api.donweb.routes';
import { Categoria } from '../interfaces/categoria.interface';
import { HttpClient } from '@angular/common/http';
import { Plan } from '../interfaces/plan';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public subject = new Subject<any>();
  public listadoCarrito: any[] = [];
  private listadoCarritoSource: any = new BehaviorSubject(this.listadoCarrito);
  currentListadoCarrito$ = this.listadoCarritoSource.asObservable();

  constructor(private http: HttpClient) {
    this.getListadoCarrito();
    // this.removeAll();
  }

  agregarItem(plan: Plan) {
    
    let finded = this.isInCarrito(plan);
    let response: boolean = false;
    // 
    // if (finded == false) {
      let url = donwebApiRoutes.agregarItem + '?plan=' + plan.plan + '&periodo=' + plan.periodoActivo;
      
      this.http.post(url, '')
        .subscribe((res: any) => {
          // let listadoAux = res.response.planes;
          
          response = res.result;
          this.getListadoCarrito();
        });
      // }
      
    return response;
  }

  removeItem(plan: any) {
    let response: boolean = false;
    this.http
      .get(donwebApiRoutes.remover + '?id_producto=' + plan.id_producto)
      .subscribe((res: any) => {
        // let listadoAux = res.response.planes;
        // 
        response = res.result;
        this.getListadoCarrito();
      });
      // this.updateListadoCart(listado)
    return response;
  }

  updateListadoCart(listado: any) {
    this.listadoCarritoSource.next(listado);
  }

  getListadoCarrito() {
    let listadoAux: Plan[] = [];
    this.http
      .post(donwebApiRoutes.getListadoCarrito, '')
      .subscribe((res: any) => {
        listadoAux = res.response;
        
        this.listadoCarrito = listadoAux;
        this.listadoCarritoSource.next(listadoAux);
      });
  }

  removeAll() {
    // this.listadoCarrito.forEach((plan) => {
    //   this.removeItem(plan);
    // });
  }

  isInCarrito(plan: Plan): boolean {
    let finded: boolean = false;
    let i = 0;
    if (this.listadoCarrito) {
      while (finded == false && i < this.listadoCarrito.length) {
        let plan_ = this.listadoCarrito[i];
        if (plan.plan == plan_.plan) {
          finded = true;
          // break;
        }
        i++;
      }
      // this.listadoCarrito.forEach((plan_) => {
      //  });
    }
    return finded;
  }

  public calcularPrecioCarrito(){
    let precioTotal = 0;
    if(this.listadoCarrito){
      this.listadoCarrito.forEach(plan => {
        precioTotal += parseInt(plan.valor);
      });
    }

    return precioTotal;
  }
  
}

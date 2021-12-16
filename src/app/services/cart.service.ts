import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Categoria } from '../interfaces/categoria.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public subject = new Subject<any>();
  public listadoCart:Categoria[] = [];
  private listadoSource:any = new  BehaviorSubject(this.listadoCart);
  currentListadoCart$ = this.listadoSource.asObservable();

  constructor() { }

  updateListadoCart(listado:any){
    this.listadoSource.next(listado);
  }
  
}

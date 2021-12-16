import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-listado-checkout',
  templateUrl: './listado-checkout.component.html',
  styleUrls: ['./listado-checkout.component.scss']
})
export class ListadoCheckoutComponent implements OnInit {

  listadoProductosCart: Categoria[] = [];
  cantidadProductos: number = 0;

  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this._cartService.currentListadoCart$.subscribe(
      (listado:any) => {
        this.listadoProductosCart = listado;
        this.cantidadProductos = this.listadoProductosCart.length;
      }
    );
  }

  eliminar(producto: any){

  }

}

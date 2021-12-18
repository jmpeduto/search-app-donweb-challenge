import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { Plan } from 'src/app/interfaces/plan';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-listado-checkout',
  templateUrl: './listado-checkout.component.html',
  styleUrls: ['./listado-checkout.component.scss'],
})
export class ListadoCheckoutComponent implements OnInit {
  listadoPlanesCart: any[] = [];
  cantidadProductos: number = 0;
  precioTotal: number = 0;

  constructor(private _cartService: CartService) {}

  ngOnInit(): void {
    this._cartService.currentListadoCarrito$.subscribe((listado: any) => {
      this.listadoPlanesCart = listado;
      this.cantidadProductos = this.listadoPlanesCart ? this.listadoPlanesCart.length : 0;
      this.precioTotal = this._cartService.calcularPrecioCarrito();
    });
  }
  
  eliminar(plan: any) {
    let result = this._cartService.removeItem(plan);
    // this._cartService.getListadoCarrito();
    this.precioTotal = this._cartService.calcularPrecioCarrito();
    // this._cartService.getListadoCarrito();
    // if (result == false) {
    //   alert('hubo un error al eliminar el producto');
    // }
  }
}

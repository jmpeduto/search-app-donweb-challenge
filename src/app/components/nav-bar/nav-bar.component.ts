import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { SearchServiceService } from 'src/app/services/search-service.service';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  @Input('searchText') searchText: string = '';
  showCart: boolean = false;
  checkout: boolean = false;
  listado: Categoria[] = [];
  @Output() search_ = new EventEmitter<string>();
  // @Input() listadoProductosCart: Categoria[];
  @Input() listadoProductosCart: Categoria[];
  cantidadProductos: number = 0;
  titulo: string = 'Productos';

  constructor(
    private _cartService: CartService,
    private _searchService: SearchServiceService,
    private router: Router
  ) {
    this.listadoProductosCart = [];
  }

  ngOnInit(): void {
    this._cartService.currentListadoCart$.subscribe((listado: any) => {
      this.listadoProductosCart = listado;
      this.cantidadProductos = this.listadoProductosCart.length;
    });
  }

  toggle(event: any) {
    event.preventDefault();
    if (this.cantidadProductos !== 0) {
      this.showCart = !this.showCart;
    }
  }

  setShowCart(show: boolean = false) {
    this.showCart = show;
  }

  setCheckout(view: boolean = false) {
    this.checkout = view;
  }

  public search(text: any) {
    // console.log(text);
    // this.search_.emit(text);
    this._searchService.searchListado(text);
  }

  public setTitulo(text: string) {
    this.titulo = text !== '' ? text : 'Titulo';
  }

  public backClicked(event:any) {
    event.preventDefault();
    this.router.navigate(['/'])
  }

}

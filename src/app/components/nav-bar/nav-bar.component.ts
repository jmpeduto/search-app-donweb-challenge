import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  listado: Categoria[] = [];
  @Output() search_ = new EventEmitter<string>();
  // @Input() listadoProductosCart: Categoria[];
  @Input() listadoProductosCart: Categoria[];
  cantidadProductos: number = 0;

  constructor(private _cartService: CartService, 
    private _searchService: SearchServiceService) {
    this.listadoProductosCart = [];
  }

  ngOnInit(): void {
    this._cartService.currentListadoCart$.subscribe(
      (listado:any) => {
        this.listadoProductosCart = listado;
        this.cantidadProductos = this.listadoProductosCart.length;
      }
    );
  }

  toggle(event:any) {
    event.preventDefault();
    if (this.cantidadProductos !== 0) {
      this.showCart = !this.showCart;
    }
  }

  public search(text: any) {
    // console.log(text);
    // this.search_.emit(text);
    this._searchService.searchListado(text);

  }
}

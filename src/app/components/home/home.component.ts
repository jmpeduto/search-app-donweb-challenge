import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { SearchServiceService } from 'src/app/services/search-service.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'search-app';
  public searchText: any;
  listadoProductos: Categoria[] = [];
  @ViewChild(NavBarComponent) navBar: any;

  getProductos$: Observable<Categoria[]> = of(this.listadoProductos);

  //aca van los agregados al carrito
  listadoProductosCart:Categoria[] = [];

  constructor(private _searchService: SearchServiceService, 
    private _cartService:CartService) {}

  public search(text: any) {
    console.log(text);
    console.log(this.listadoProductos);
    this.searchText = text;

    this.listadoProductos.filter((it) => {
      return it.nombre.toLocaleLowerCase().includes(text);
      //si el elemento esta en la busqueda
      // if (filtered) {
      //   this.navBar.listadoProductosCart.push(it);
      // }
    });
  }

  public addToCart(productId: number) {
    console.log(productId);
    
    this.listadoProductos.forEach((producto) => {
      if (producto.id == productId) {
        this.listadoProductosCart.push(producto);
      }
    });

    this._cartService.updateListadoCart(this.listadoProductosCart);
  }

  public loadListado() {
    // console.log(text);
    console.log(this.listadoProductos);
  }

  ngOnInit() {
    console.log("oninit");
    this._searchService.getAllCategorias();
    this._searchService.currentListado$.subscribe(
      (listado:any) => (this.listadoProductos = listado)
    );

  }

}

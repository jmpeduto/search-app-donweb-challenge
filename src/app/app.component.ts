import { Component, OnInit, ViewChild } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { SearchServiceService } from './services/search-service.service';
import { Categoria } from './interfaces/categoria.interface';
import { Observable, of } from 'rxjs';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'search-app';
  public searchText: any;
  listadoProductos: Categoria[] = [];
  @ViewChild(NavBarComponent) navBar: any;

  getProductos$: Observable<Categoria[]> = of(this.listadoProductos);

  // public dataset: any[] = [
  //   'MDB',
  //   'Angular',
  //   'Bootstrap',
  //   'Framework',
  //   'SPA',
  //   'React',
  //   'Vue',
  // ];

  //aca van los agregados al carrito
  listadoProductosCart = [];

  constructor(private searchService: SearchServiceService) {}

  public async search(text: any) {
    console.log(text);
    console.log(this.listadoProductos);
    this.searchText = text;

    this.navBar.listadoProductosCart = [];

    this.listadoProductos.filter((it) => {
      let filtered = it.nombre.toLocaleLowerCase().includes(text);
      //si el elemento esta en la busqueda
      // if (filtered) {
      //   this.navBar.listadoProductosCart.push(it);
      // }
      return filtered;
    });
  }

  public addToCart(productId: number) {
    console.log(productId);

    this.listadoProductos.forEach((producto) => {
      if (producto.id == productId) {
        this.navBar.listadoProductosCart.push(producto);
      }
    });
  }

  public loadListado() {
    // console.log(text);
    console.log(this.listadoProductos);
  }

  ngOnInit() {
    console.log(this.searchService.listado);
    this.searchService
      .getAllCategorias()
      .subscribe((resp: any) => (this.listadoProductos = resp.data));
  }
}

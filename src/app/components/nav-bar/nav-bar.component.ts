import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { Plan } from 'src/app/interfaces/plan';
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
  @Output() search_ = new EventEmitter<string>();
  // @Input() listadoProductosCart: Categoria[];
  listadoCarrito: any[] = [];
  cantidadProductos: number = 0;
  titulo: string = 'Productos';
  precioTotal: number = 0;
  @ViewChild('searchInput')
  searchInput!: ElementRef;



  constructor(
    private _cartService: CartService,
    private _searchService: SearchServiceService,
    private router: Router,
    private r2: Renderer2
    // private el: ElementRef
  ) {

  }

  ngOnInit(): void {
    // this.getListadoCarrito();
    this._cartService.currentListadoCarrito$.subscribe((listado: any) => {
      // this._cartService.getListadoCarrito();
      this.listadoCarrito = listado;
      this.cantidadProductos = this.listadoCarrito ? this.listadoCarrito.length : 0;
      if(this.cantidadProductos > 0){
        this.precioTotal = this._cartService.calcularPrecioCarrito();
      }
    });

  }

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    this.r2.setProperty(this.searchInput.nativeElement, 'value', '');
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._cartService.currentListadoCarrito$.unsubscribe();
    
  }
  

}

import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { find, Observable, of, Subscription } from 'rxjs';
import { SearchServiceService } from 'src/app/services/search-service.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CartService } from '../../services/cart.service';
import { Plan } from '../../interfaces/plan';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = 'search-app';
  public searchText: any;
  listadoPlanes: Plan[] = [];
  @ViewChild(NavBarComponent) navBar: any;
  subscription: Subscription = new Subscription();

  cartServiceSubscription$: any;
  searchServiceSubscription$: any;
  cargadoListado: boolean = false;


  // getProductos$: Observable<Categoria[]> = of(this.listadoProductos);

  //aca van los agregados al carrito
  listadoPlanesCart: Plan[] = [];

  constructor(
    public _searchService: SearchServiceService,
    private _cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  public addToCart(plan: Plan, periodo: number) {
    plan.agregadoCarrito = true;
    plan.periodoActivo = periodo;
    this._cartService.agregarItem(plan);
  }

  ngOnInit() {
    this.cargarListados();
    // this._searchService.llamadaPruebaCors();
  }

   cargarListados() {
    
    // this.navBar.setTitulo("Productos");
    // this._searchService.getListado();
    this.cartServiceSubscription$ =
      this._cartService.currentListadoCarrito$.subscribe((listado: any) => {
        this.listadoPlanesCart = listado;
        //ve si ya estan agregados al carrito
        this.searchServiceSubscription$ =
          this._searchService.currentListado$.subscribe((listado: any) => {
            this.listadoPlanes = listado;
            //ve si ya estan agregados al carrito
          });
      });

    //recarga los listados
    this._searchService.getListado();
    this._cartService.getListadoCarrito();
  }

  // filtra los planes que ya fueron agregados al carrito
  async checkDisponibles() {
    // this._cartService.
    
    
    if (this.listadoPlanesCart) {
      this.listadoPlanes.forEach((plan) => {
        let i = 0;
        let finded = false;
        while (!finded && i < this.listadoPlanesCart.length) {
          if (plan.nombre == this.listadoPlanesCart[i].nombre) {
            let planAux_ = plan;
            planAux_.agregadoCarrito = true;
            this.listadoPlanes.filter(function (plan, index, arr) {
              return plan.nombre == planAux_.nombre;
            });
            // this.listadoPlanes.push(planAux_);
            finded = true;
          }
          i++;
        }
      });
    } else {
      // this._searchService.getListado();
      // this._cartService.getListadoCarrito();
    }
    
    
    // listadoPlanes
  }

  arrayRemove(arr: any, value: any) {
    return arr.filter(function (ele: any) {
      return ele != value;
    });
  }

  ngAfterViewChecked() {
    
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    this.checkDisponibles();
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
    // this.searchServiceSubscription$.unsubscribe();
    // this.cartServiceSubscription$.unsubscribe();
    this.listadoPlanesCart = [];
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { SearchServiceService } from './services/search-service.service';
import { Categoria } from './interfaces/categoria.interface';
import { Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'search-app';
  @ViewChild(NavBarComponent) navBar: any;
  currentRoute: string = "";
  

  constructor(private router: Router) {
    
    this.router.events.pipe(filter((event:any) => event instanceof NavigationEnd)
    ).subscribe(event => 
      {
        this.currentRoute = event.url;          
        console.log(event);
        console.log(this.currentRoute);

        //cambio valores navbar
        switch (this.currentRoute) {
          case "/":
            this.navBar.setTitulo("Productos");
            this.navBar.setCheckout(false);
            break;
        
          case "/listadoCheckout":
            this.navBar.setTitulo("Listado de productos del carrito");
            this.navBar.setShowCart(false);
            this.navBar.setCheckout(true);
            break;
        
          default:
            break;
        }
      });
      // console.log(router.url);
    }
  

  ngOnInit() {
    console.log(this.router.url);
  }
}

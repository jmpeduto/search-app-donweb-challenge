import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { SearchServiceService } from './services/search-service.service';
import { Categoria } from './interfaces/categoria.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'search-app';
  public searchText: any;
  listado: Categoria[] = [];
  showCart: boolean = false;

  public dataset: any[] = [
    'MDB',
    'Angular',
    'Bootstrap',
    'Framework',
    'SPA',
    'React',
    'Vue',
  ];

  constructor(private searchService: SearchServiceService) {}

  public search(text: any) {
    console.log(text);
    console.log(this.listado);
  }

  ngOnInit() {
    this.searchService
      .getAllCategorias()
      .subscribe((resp: any) => (this.listado = resp.data));
  }

  toggle() {
    this.showCart = !this.showCart;
  }
}

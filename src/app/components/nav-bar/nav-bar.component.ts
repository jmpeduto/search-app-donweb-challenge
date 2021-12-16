import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { SearchServiceService } from 'src/app/services/search-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input("searchText") searchText:string = '';
  showCart: boolean = false;
  listado: Categoria[] = [];
  @Output() search_ = new EventEmitter<string>();
  // @Input() listadoProductosCart: Categoria[];
  @Input() listadoProductosCart: Categoria[];

  
  

  constructor(private searchService: SearchServiceService) { 
    this.listadoProductosCart = [];
  }

  ngOnInit(): void {
  }

  toggle() {
    this.showCart = !this.showCart;
  }

  public search(text: any) {
    console.log(text);
    // console.log(this.listado);
    // this.searchService
    // .getAllCategorias()
    // .subscribe((resp: any) => 
    //   {
    //     this.listado = resp.data;
    //     this.search_.emit(this.listado);
    //   });
    this.search_.emit(text);

  }

}

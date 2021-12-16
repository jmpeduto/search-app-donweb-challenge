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
  @ViewChild(NavBarComponent) navBar: any;

  constructor() {}

  ngOnInit() {
  }
}

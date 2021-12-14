import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { SearchServiceService } from './services/search-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'search-app';
  public searchText:any;

  public dataset:any[] = ['MDB', 'Angular', 'Bootstrap', 'Framework', 'SPA', 'React', 'Vue'];

  constructor(private searchService:SearchServiceService){}

  public search(text:any){
    console.log(text);
  }

  ngOnInit(){
    this.searchService.getAllCategorias();
    console.log('caca');
  }
}

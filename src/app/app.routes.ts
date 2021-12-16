import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListadoCheckoutComponent } from './components/listado-checkout/listado-checkout.component';

// export const ROUTES: Routes = [
//     {path: 'home', component: HomeComponent},
//     {path: 'search', component: SearchComponent},
//     {path: 'artist/:id', component: ArtistaComponent},
//     {path: '', pathMatch: 'full', redirectTo: 'home'},
//     {path: '**', pathMatch: 'full', redirectTo: 'home'}
// ]

export const ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'listadoCheckout', component: ListadoCheckoutComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

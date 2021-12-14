import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchServiceService {
  // Fake API URL
  //en proxy.conf.json equivale a "target": "http://138.36.238.131:50074/api/getAllCategorias",
  url: string = 'http://localhost:4200/api';
  usersArray: [] = [];

  constructor(private http: HttpClient) {}

  getAllCategorias() {
    this.http.post(this.url, '').subscribe((data) => {
      // Populating usersArray with names from API
      // data.json().forEach(element => {
      //   this.usersArray.push(element.name);
      // });
      console.log('caca');
      console.log(data);
    });
  }
}
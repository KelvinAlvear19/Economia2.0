import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BASE_URL } from '../constants';

export interface Banco {
  id: string | number;
  nombre: string;
  descripcion: string;
  imagen: string;

}

@Injectable({
  providedIn: 'root'
})
export class BancoService {



  constructor(private http: HttpClient) { }


  getAll() {
    return this.http.get(BASE_URL+"banco")
  }

  getById(id: string){
    return this.http.get(BASE_URL+"banco?id="+id)
  }

}

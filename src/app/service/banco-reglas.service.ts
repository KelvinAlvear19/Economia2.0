import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../constants';

export interface BancoRegla {
  id: string | number;
  bancoId: string | number;
  tipoCreditoId: string | number;
  maxPlazo: string | number;
  interes: string | number;
  nombre: string;
}

@Injectable({
  providedIn: 'root',
})
export class BancoReglasService {
  constructor(private http: HttpClient) {}

  getPorBanco(id: string | number) {
    return this.http.get(
      BASE_URL + 'bancoTipoCredito?_embed=tipoCredito&bancoId=' + id
    );
  }
}

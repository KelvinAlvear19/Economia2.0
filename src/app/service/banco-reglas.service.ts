import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../constants';
import { Observable } from 'rxjs';
export interface BancoRegla {
  id: string | number;
  bancoId: string | number;
  tipoCreditoId: string | number;
  maxPlazo: string | number;
  interes: string | number;
  nombre: string;
  imagen: string; 
  editable?: boolean;
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
  actualizarRegla(reglaId: string | number, reglaActualizada: Partial<BancoRegla>): Observable<BancoRegla> {
    const url = `${BASE_URL}bancoTipoCredito/${reglaId}`;
    return this.http.put<BancoRegla>(url, reglaActualizada);
  }
  
  
  
}

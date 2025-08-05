import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cita } from '../models/cita.model';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private baseUrl = 'http://localhost:3000/citas';

  constructor(private http: HttpClient) {}

  getCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.baseUrl);
  }

  getCita(id: string): Observable<Cita> {
    return this.http.get<Cita>(`${this.baseUrl}/${id}`);
  }

  crearCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.baseUrl, cita);
  }

  actualizarCita(cita: Cita): Observable<Cita> {
    return this.http.put<Cita>(`${this.baseUrl}/${cita.id}`, cita);
  }

  eliminarCita(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
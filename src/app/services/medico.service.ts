import { Injectable } from '@angular/core';
import { Medico } from '../models/medico.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  private baseUrl = 'http://localhost:3000/medicos';

  constructor(private http: HttpClient) {}

  getMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.baseUrl);
  }

  getMedico(id: string): Observable<Medico> {
    return this.http.get<Medico>(`${this.baseUrl}/${id}`);
  }

  crearMedico(medico: Medico): Observable<Medico> {
    return this.http.post<Medico>(this.baseUrl, medico);
  }

  actualizarMedico(medico: Medico): Observable<Medico> {
    return this.http.put<Medico>(`${this.baseUrl}/${medico.id}`, medico);
  }

  eliminarMedico(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  /*
  // SOLO por Nombre -> GET /pacientes?dni=30118334
  getByName(nombre: string): Observable<Medico[]> {
    const params = new HttpParams().set('nombre', nombre.trim());
    return this.http.get<Medico[]>(this.baseUrl, { params });
  }
  */

  // Habra que buscar tal cual , ejemplo "Dr. Roxana"
  getByName(nombre: string): Observable<Medico[]> {
  const params = new HttpParams().set('nombre', nombre.trim());
  return this.http.get<Medico[]>(this.baseUrl, { params });
}



}

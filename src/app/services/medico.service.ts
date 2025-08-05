import { Injectable } from '@angular/core';
import { Medico } from '../models/medico.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

  crearMedico(cita: Medico): Observable<Medico> {
    return this.http.post<Medico>(this.baseUrl, cita);
  }

  actualizarMedico(cita: Medico): Observable<Medico> {
    return this.http.put<Medico>(`${this.baseUrl}/${cita.id}`, cita);
  }

  eliminarMedico(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

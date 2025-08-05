import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
 
  private baseUrl = 'http://localhost:3000/pacientes';

  constructor(private http: HttpClient) {}

  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.baseUrl);
  }

  getPaciente(id: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.baseUrl}/${id}`);
  }

  crearPaciente(cita: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.baseUrl, cita);
  }

  actualizarPaciente(cita: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.baseUrl}/${cita.id}`, cita);
  }

  eliminarPaciente(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

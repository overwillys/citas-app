import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  
  private baseUrl = `${environment.API_BASE}/pacientes`
  //private baseUrl = 'http://localhost:3000/pacientes';
  //http://localhost:3000/pacientes?nombre=Williams

  constructor(private http: HttpClient) {}


  // DI - inject
  //private httpClient = inject(HttpClient)

  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.baseUrl);
  }

  getPaciente(id: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.baseUrl}/${id}`);
  }

  crearPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.baseUrl, paciente);
  }

  actualizarPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.baseUrl}/${paciente.id}`, paciente);
  }

  eliminarPaciente(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  /*
// Buscar un paciente por su nombre:
  buscarXnombre(nombre:string):Observable<Paciente[]>{
    const aux = this.baseUrl+'/?nombre='+nombre
    console.log(aux)
    return this.http.get<Paciente[]>(aux);
  }
  */

  // Busqueda usando params
  /*  
  searchPacientes(dni: string, nombre: string): Observable<Paciente[]> {
    let params = new HttpParams();
    if (dni.trim()) params = params.set('dni', dni);
    if (nombre.trim()) params = params.set('nombre', nombre);
    return this.http.get<Paciente[]>(this.baseUrl, { params });
  }
  */

  // SOLO por DNI -> GET /pacientes?dni=30118334
  getByDni(dni: string): Observable<Paciente[]> {
    const params = new HttpParams().set('dni', dni.trim());
    return this.http.get<Paciente[]>(this.baseUrl+'?=', { params });
  }



}

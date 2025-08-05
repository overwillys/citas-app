import { Especialidad } from "./especialidad.enum";

export interface Medico {
  id?: string;
  nombre: string;
  especialidad: Especialidad;
  telefono: string;
  email: string;
}

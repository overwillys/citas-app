import { Paciente } from './paciente.model';
import { Medico } from './medico.model';

export interface Cita {
  id?: string;
  fecha: string; // 
  motivo: string;
  pacienteId: string;
  medicoId: string;
  paciente: Paciente;
  medico?: Medico;
}

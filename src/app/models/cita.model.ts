import { Paciente } from './paciente.model';
import { Medico } from './medico.model';

export interface Cita {
  id?: string;
  fecha: string; // formato ISO: "2025-07-29T14:00"
  motivo: string;
  pacienteId: string;
  medicoId: string;
  paciente?: Paciente; // opcional, si se quiere incluir info completa
  medico?: Medico;
}

import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/ui/not-found/not-found.component';
import { ListCitasComponent } from './features/citas/list-citas/list-citas.component';
import { ListPacientesComponent } from './features/pacientes/list-pacientes/list-pacientes.component';
import { ListMedicosComponent } from './features/medicos/list-medicos/list-medicos.component';
import { FormCitaComponent } from './features/citas/form-cita/form-cita.component';
import { FormPacienteComponent } from './features/pacientes/form-paciente/form-paciente.component';
import { FormMedicoComponent } from './features/medicos/form-medico/form-medico.component';

export const routes: Routes = [
  { path: '',redirectTo: 'citas',pathMatch: 'full' },
  { path: 'citas', component: ListCitasComponent },
  { path: 'pacientes', component: ListPacientesComponent },
  { path: 'medicos', component: ListMedicosComponent },

  // rutas de formularios Cita:
  { path: 'citas/crear', component: FormCitaComponent },
  { path: 'citas/editar/:id', component: FormCitaComponent },

  // rutas de pacientes:
  { path: 'pacientes/crear', component: FormPacienteComponent },
  { path: 'pacientes/editar/:id', component: FormPacienteComponent },
    
// rutas de meedicos:
  { path: 'medicos/crear', component: FormMedicoComponent },
  { path: 'medicos/editar/:id', component: FormMedicoComponent },

  { path: '**',component: NotFoundComponent },

];

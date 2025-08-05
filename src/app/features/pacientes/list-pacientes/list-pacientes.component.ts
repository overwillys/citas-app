import { Component, OnInit, signal } from '@angular/core';
import { Paciente } from '../../../models/paciente.model';
import { PacienteService } from '../../../services/paciente.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-pacientes',
  imports: [RouterLink],
  templateUrl: './list-pacientes.component.html',
  styleUrl: './list-pacientes.component.css'
})
export class ListPacientesComponent implements OnInit {
  pacientes = signal<Paciente[]>([]);

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.pacienteService.getPacientes().subscribe((data) => {
      this.pacientes.set(data);
    });
  }

  eliminarPaciente(id: string): void {
  Swal.fire({
    title: '¿Eliminar paciente?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar'
  }).then((res) => {
    if (res.isConfirmed) {
      this.pacienteService.eliminarPaciente(id).subscribe(() => {
        this.pacienteService.getPacientes().subscribe((data) => {
          this.pacientes.set(data);
        });
        Swal.fire('Eliminado', 'El paciente fue eliminado.', 'success');
      });
    }
  });
}

}
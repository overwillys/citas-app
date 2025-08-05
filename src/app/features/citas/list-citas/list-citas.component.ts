import { Component, OnInit, signal } from '@angular/core';
import { Cita } from '../../../models/cita.model';
import { CitaService } from '../../../services/cita.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-citas',
  imports: [RouterLink],
  templateUrl: './list-citas.component.html',
  styleUrl: './list-citas.component.css'
})
export class ListCitasComponent implements OnInit {
  citas = signal<Cita[]>([]);

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.citaService.getCitas().subscribe((data) => {
      this.citas.set(data);
    });
  }

  eliminarCita(id: string): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará la cita permanentemente.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.citaService.eliminarCita(id).subscribe(() => {
        // Refrescar lista
        this.citaService.getCitas().subscribe((data) => {
          this.citas.set(data);
        });

        Swal.fire('Eliminado', 'La cita fue eliminada.', 'success');
      });
    }
  });
}
}

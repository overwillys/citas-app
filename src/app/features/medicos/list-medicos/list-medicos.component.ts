import { Component, OnInit, signal } from '@angular/core';
import { Medico } from '../../../models/medico.model';
import { MedicoService } from '../../../services/medico.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  standalone: true,
  selector: 'app-list-medicos',
  imports: [RouterLink],
  templateUrl: './list-medicos.component.html',
  styleUrl: './list-medicos.component.css'
})
export class ListMedicosComponent  implements OnInit{

  medicos = signal<Medico[]>([]);

  constructor(private medicoService: MedicoService) {}

  ngOnInit(): void {
    this.medicoService.getMedicos().subscribe((data) => {
      this.medicos.set(data);
    });
  }

  eliminarMedico(id: string): void {
  Swal.fire({
    title: '¿Eliminar médico?',
    text: 'No podrás recuperarlo luego.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Eliminar'
  }).then((res) => {
    if (res.isConfirmed) {
      this.medicoService.eliminarMedico(id).subscribe(() => {
        this.medicoService.getMedicos().subscribe((data) => {
          this.medicos.set(data);
        });
        Swal.fire('Eliminado', 'El médico fue eliminado.', 'success');
      });
    }
  });
}

}
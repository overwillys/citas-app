import { Component, OnInit, signal } from '@angular/core';
import { Cita } from '../../../models/cita.model';
import { CitaService } from '../../../services/cita.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { Medico } from '../../../models/medico.model';
import { MedicoService } from '../../../services/medico.service';


@Component({
  selector: 'app-list-citas',
  imports: [RouterLink],
  templateUrl: './list-citas.component.html',
  styleUrl: './list-citas.component.css'
})
export class ListCitasComponent implements OnInit {

  //usando propiedades normal de clase
  //citas: Cita[] = [];
  //medicos: Medico[] = [];
  
  
  //Mejor un signals 
  citas   = signal<Cita[]>([]);
  medicos = signal<Medico[]>([]);

  constructor(private citaService: CitaService, private medicoService: MedicoService) {}

  ngOnInit(): void {
    this.citaService.getCitas().subscribe((data) => {
      this.citas.set(data);
    });

    this.medicoService.getMedicos().subscribe((data) =>{
      this.medicos.set(data);
    })
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


// obtniendo el nommbre del medico para la cita :

getNombreMedico( medicoId: string ){
  // llamo al signal de medico, busca dentro del array de "m",  dentro cuyo "id" sea igual al paràmetro ( medicoId) 
  // Si find encuentra mostramos el nombre, sino , mostramos "--"
  return this.medicos().find(m=> m.id === medicoId)?.nombre ?? ' No tiene medico asignado.-';
}

}



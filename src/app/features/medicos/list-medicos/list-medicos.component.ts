import { Component, OnInit, signal } from '@angular/core';
import { Medico } from '../../../models/medico.model';
import { MedicoService } from '../../../services/medico.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  standalone: true,
  selector: 'app-list-medicos',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './list-medicos.component.html',
  styleUrl: './list-medicos.component.css'
})
export class ListMedicosComponent  implements OnInit{

  // usando una propiedad normal de clase
  //medicos: Medico[] = [];
  
  //Mejor un signal 
  medicos = signal<Medico[]>([]);

  formBusca = new FormGroup({
    nombre: new FormControl('', { nonNullable: true })
  });

  constructor(private medicoService: MedicoService) {}

  ngOnInit(): void {
    this.cargarTodos();
   /* this.medicoService.getMedicos().subscribe((data) => {
      this.medicos.set(data);
    });
    */
  }


  private cargarTodos(): void {
    this.medicoService.getMedicos()
      .subscribe(data => this.medicos.set(data));
  }


  buscar(): void {
    const nombre = this.formBusca.controls.nombre.value.trim(); // trim para que no venga vacio
    if (!nombre) { this.cargarTodos(); return; } // sin nombre => lista completa
    this.medicoService.getByName(nombre)
      .subscribe(data => this.medicos.set(data));
  }

  limpiar(): void {
    this.formBusca.reset({ nombre: '' });
    this.cargarTodos();
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
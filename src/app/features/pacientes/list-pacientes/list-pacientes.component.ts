import { Component, OnInit, signal } from '@angular/core';
import { Paciente } from '../../../models/paciente.model';
import { PacienteService } from '../../../services/paciente.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-pacientes',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './list-pacientes.component.html',
  styleUrl: './list-pacientes.component.css'
})
export class ListPacientesComponent implements OnInit {

  // usando una propiedad normal de clase
  //pacientes: Paciente[] = [];

  //Mejor un signal 
  pacientes = signal<Paciente[]>([]);

  //form para la busqueda
  /*
  formBusca = new FormGroup({
    dni: new FormGroup<string>(''),
  });
  */

  formBusca = new FormGroup({
    dni: new FormControl('', { nonNullable: true })
  });


  constructor(private pacienteService: PacienteService) { }

  ngOnInit(): void {
    /*
    this.pacienteService.getPacientes().
    subscribe((data) => { this.pacientes.set(data);
      
    });
    */
    this.cargarTodos();
  }

  private cargarTodos(): void {
    this.pacienteService.getPacientes()
      .subscribe(data => this.pacientes.set(data));
  }


  buscar(): void {
    const dni = this.formBusca.controls.dni.value.trim(); // trim para que no venga vacio
    if (!dni) { this.cargarTodos(); return; } // sin DNI => lista completa
    this.pacienteService.getByDni(dni)
      .subscribe(data => this.pacientes.set(data));
  }

  limpiar(): void {
    this.formBusca.reset({ dni: '' });
    this.cargarTodos();
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
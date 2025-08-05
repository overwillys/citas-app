import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CitaService } from '../../../services/cita.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cita } from '../../../models/cita.model';
import { CommonModule } from '@angular/common';
import { Paciente } from '../../../models/paciente.model';
import { Medico } from '../../../models/medico.model';
import { PacienteService } from '../../../services/paciente.service';
import { MedicoService } from '../../../services/medico.service';

@Component({
   standalone: true,
  selector: 'app-form-cita',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-cita.component.html',
  styleUrl: './form-cita.component.css'
})


export class FormCitaComponent implements OnInit {
  form!: FormGroup;
  citaId?: string;

  pacientes = signal<Paciente[]>([]);
  medicos = signal<Medico[]>([]);

  constructor(
    private fb: FormBuilder,
    private citaService: CitaService,
    private pacienteService: PacienteService,
    private medicoService: MedicoService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fecha: ['', Validators.required],
      motivo: ['', [Validators.required, Validators.minLength(5)]],
      pacienteId: [null, Validators.required],
      medicoId: [null, Validators.required]
    });

  this.citaId = this.route.snapshot.paramMap.get('id') ?? undefined;
    if (this.citaId) {
      this.citaService.getCita(this.citaId).subscribe((cita) => {
        this.form.patchValue(cita);
      });
    }

    // Cargar opciones para selects
    this.pacienteService.getPacientes().subscribe((data) => {
      this.pacientes.set(data);
    });

    this.medicoService.getMedicos().subscribe((data) => {
      this.medicos.set(data);
    });
  }

  guardar(): void {
    if (this.form.invalid) return;

    // si editamos una cita, le agregamos el id, sino sino
    // si la creamos , no le asignamos el id
    const cita: Cita = this.citaId ? { id: this.citaId, ...this.form.value }: this.form.value;

    const callback = () => this.router.navigate(['/citas']);

    if (this.citaId) {
      this.citaService.actualizarCita(cita).subscribe(callback);
    } else {
      this.citaService.crearCita(cita).subscribe(callback);
    }
  }
}
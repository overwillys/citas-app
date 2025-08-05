import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { PacienteService } from '../../../services/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from '../../../models/paciente.model';

@Component({
  selector: 'app-form-paciente',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-paciente.component.html',
  styleUrl: './form-paciente.component.css'
})
export class FormPacienteComponent implements OnInit {
  form!: FormGroup;
  pacienteId?: string;

  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', [Validators.required, Validators.minLength(8)]],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.pacienteId = this.route.snapshot.paramMap.get('id') ?? undefined;
    if (this.pacienteId) {
      this.pacienteService.getPaciente(this.pacienteId).subscribe((p) => {
        this.form.patchValue(p);
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) return;


    const paciente: Paciente = this.pacienteId ? { id: this.pacienteId, ...this.form.value } : this.form.value;

    const callback = () => this.router.navigate(['/pacientes']);

    if (this.pacienteId) {
      this.pacienteService.actualizarPaciente(paciente).subscribe(callback);
    } else {
      this.pacienteService.crearPaciente(paciente).subscribe(callback);
    }
  }
}

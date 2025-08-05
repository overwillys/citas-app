import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { MedicoService } from '../../../services/medico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Medico } from '../../../models/medico.model';
import { Especialidad } from '../../../models/especialidad.enum';

@Component({
  standalone: true,
  selector: 'app-form-medico',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-medico.component.html',
  styleUrl: './form-medico.component.css'
})
export class FormMedicoComponent implements OnInit {
  form!: FormGroup;
  medicoId?: string;

  especialidades = Object.values(Especialidad); // ['Clínico', 'Cardiólogo', ...]


  constructor(
    private fb: FormBuilder,
    private medicoService: MedicoService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      especialidad: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.medicoId = this.route.snapshot.paramMap.get('id') ?? undefined;
    if (this.medicoId) {
      this.medicoService.getMedico(this.medicoId).subscribe((m) => {
        this.form.patchValue(m);
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) return;
    
    const medico: Medico = this.medicoId ? { id: this.medicoId, ...this.form.value } : this.form.value;

    const callback = () => this.router.navigate(['/medicos']);

    if (this.medicoId) {
      this.medicoService.actualizarMedico(medico).subscribe(callback);
    } else {
      this.medicoService.crearMedico(medico).subscribe(callback);
    }
  }
}

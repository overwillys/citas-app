import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMedicoComponent } from './form-medico.component';

describe('FormMedicoComponent', () => {
  let component: FormMedicoComponent;
  let fixture: ComponentFixture<FormMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMedicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

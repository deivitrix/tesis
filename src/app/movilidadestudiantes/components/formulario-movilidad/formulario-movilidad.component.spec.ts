import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioMovilidadComponent } from './formulario-movilidad.component';

describe('FormularioMovilidadComponent', () => {
  let component: FormularioMovilidadComponent;
  let fixture: ComponentFixture<FormularioMovilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioMovilidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioMovilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRecuperaCuentaComponent } from './formulario-recupera-cuenta.component';

describe('FormularioRecuperaCuentaComponent', () => {
  let component: FormularioRecuperaCuentaComponent;
  let fixture: ComponentFixture<FormularioRecuperaCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioRecuperaCuentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioRecuperaCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

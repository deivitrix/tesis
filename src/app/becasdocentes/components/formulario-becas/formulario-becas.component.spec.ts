import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioBecasComponent } from './formulario-becas.component';

describe('FormularioBecasComponent', () => {
  let component: FormularioBecasComponent;
  let fixture: ComponentFixture<FormularioBecasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioBecasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioBecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

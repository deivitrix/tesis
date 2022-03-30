import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirDocumentoFinalMovilidadComponent } from './subir-documento-final-movilidad.component';

describe('SubirDocumentoFinalMovilidadComponent', () => {
  let component: SubirDocumentoFinalMovilidadComponent;
  let fixture: ComponentFixture<SubirDocumentoFinalMovilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubirDocumentoFinalMovilidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirDocumentoFinalMovilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

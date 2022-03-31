import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogsubirdocumentomovilidadComponent } from './dialogsubirdocumentomovilidad.component';

describe('DialogsubirdocumentomovilidadComponent', () => {
  let component: DialogsubirdocumentomovilidadComponent;
  let fixture: ComponentFixture<DialogsubirdocumentomovilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogsubirdocumentomovilidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogsubirdocumentomovilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

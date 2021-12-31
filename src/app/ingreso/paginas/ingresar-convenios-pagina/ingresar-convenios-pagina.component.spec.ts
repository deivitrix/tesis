import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarConveniosPaginaComponent } from './ingresar-convenios-pagina.component';

describe('IngresarConveniosPaginaComponent', () => {
  let component: IngresarConveniosPaginaComponent;
  let fixture: ComponentFixture<IngresarConveniosPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresarConveniosPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarConveniosPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

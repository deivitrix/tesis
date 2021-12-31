import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarPlantillaConveniosPaginasComponent } from './ingresar-plantilla-convenios-paginas.component';

describe('IngresarPlantillaConveniosPaginasComponent', () => {
  let component: IngresarPlantillaConveniosPaginasComponent;
  let fixture: ComponentFixture<IngresarPlantillaConveniosPaginasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresarPlantillaConveniosPaginasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarPlantillaConveniosPaginasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

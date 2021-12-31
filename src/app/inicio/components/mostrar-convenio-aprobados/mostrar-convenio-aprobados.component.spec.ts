import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarConvenioAprobadosComponent } from './mostrar-convenio-aprobados.component';

describe('MostrarConvenioAprobadosComponent', () => {
  let component: MostrarConvenioAprobadosComponent;
  let fixture: ComponentFixture<MostrarConvenioAprobadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarConvenioAprobadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarConvenioAprobadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

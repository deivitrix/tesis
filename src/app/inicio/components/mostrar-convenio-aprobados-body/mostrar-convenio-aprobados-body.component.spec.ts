import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarConvenioAprobadosBodyComponent } from './mostrar-convenio-aprobados-body.component';

describe('MostrarConvenioAprobadosBodyComponent', () => {
  let component: MostrarConvenioAprobadosBodyComponent;
  let fixture: ComponentFixture<MostrarConvenioAprobadosBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarConvenioAprobadosBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarConvenioAprobadosBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

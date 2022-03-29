import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablamovilidadAprobadoComponent } from './tablamovilidad-aprobado.component';

describe('TablamovilidadAprobadoComponent', () => {
  let component: TablamovilidadAprobadoComponent;
  let fixture: ComponentFixture<TablamovilidadAprobadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablamovilidadAprobadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablamovilidadAprobadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

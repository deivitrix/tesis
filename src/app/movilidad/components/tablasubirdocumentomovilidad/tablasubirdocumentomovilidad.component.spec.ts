import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablasubirdocumentomovilidadComponent } from './tablasubirdocumentomovilidad.component';

describe('TablasubirdocumentomovilidadComponent', () => {
  let component: TablasubirdocumentomovilidadComponent;
  let fixture: ComponentFixture<TablasubirdocumentomovilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablasubirdocumentomovilidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablasubirdocumentomovilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

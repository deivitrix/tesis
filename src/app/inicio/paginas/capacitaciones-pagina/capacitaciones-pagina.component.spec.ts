import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacitacionesPaginaComponent } from './capacitaciones-pagina.component';

describe('CapacitacionesPaginaComponent', () => {
  let component: CapacitacionesPaginaComponent;
  let fixture: ComponentFixture<CapacitacionesPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacitacionesPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacitacionesPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

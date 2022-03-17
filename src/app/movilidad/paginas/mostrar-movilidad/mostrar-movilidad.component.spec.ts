import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarMovilidadComponent } from './mostrar-movilidad.component';

describe('MostrarMovilidadComponent', () => {
  let component: MostrarMovilidadComponent;
  let fixture: ComponentFixture<MostrarMovilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarMovilidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarMovilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

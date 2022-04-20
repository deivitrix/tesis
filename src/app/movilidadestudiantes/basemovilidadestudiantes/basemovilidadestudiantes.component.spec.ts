import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasemovilidadestudiantesComponent } from './basemovilidadestudiantes.component';

describe('BasemovilidadestudiantesComponent', () => {
  let component: BasemovilidadestudiantesComponent;
  let fixture: ComponentFixture<BasemovilidadestudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasemovilidadestudiantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasemovilidadestudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

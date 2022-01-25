import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovilidadpaginaprincipalmodificarComponent } from './movilidadpaginaprincipalmodificar.component';

describe('MovilidadpaginaprincipalmodificarComponent', () => {
  let component: MovilidadpaginaprincipalmodificarComponent;
  let fixture: ComponentFixture<MovilidadpaginaprincipalmodificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovilidadpaginaprincipalmodificarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovilidadpaginaprincipalmodificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

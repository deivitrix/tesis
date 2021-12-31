import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovilidadPaginaComponent } from './movilidad-pagina.component';

describe('MovilidadPaginaComponent', () => {
  let component: MovilidadPaginaComponent;
  let fixture: ComponentFixture<MovilidadPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovilidadPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovilidadPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

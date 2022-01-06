import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarCategoriaComponent } from './ingresar-categoria.component';

describe('IngresarCategoriaComponent', () => {
  let component: IngresarCategoriaComponent;
  let fixture: ComponentFixture<IngresarCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresarCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

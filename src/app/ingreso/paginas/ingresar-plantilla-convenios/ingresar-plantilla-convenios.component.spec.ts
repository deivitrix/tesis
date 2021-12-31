import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarPlantillaConveniosComponent } from './ingresar-plantilla-convenios.component';

describe('IngresarPlantillaConveniosComponent', () => {
  let component: IngresarPlantillaConveniosComponent;
  let fixture: ComponentFixture<IngresarPlantillaConveniosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresarPlantillaConveniosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarPlantillaConveniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

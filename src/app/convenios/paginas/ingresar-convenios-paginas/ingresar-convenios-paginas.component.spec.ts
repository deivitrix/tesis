import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarConveniosPaginasComponent } from './ingresar-convenios-paginas.component';

describe('IngresarConveniosPaginasComponent', () => {
  let component: IngresarConveniosPaginasComponent;
  let fixture: ComponentFixture<IngresarConveniosPaginasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresarConveniosPaginasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarConveniosPaginasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConveniosAprobadosPaginaComponent } from './convenios-aprobados-pagina.component';

describe('ConveniosAprobadosPaginaComponent', () => {
  let component: ConveniosAprobadosPaginaComponent;
  let fixture: ComponentFixture<ConveniosAprobadosPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConveniosAprobadosPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConveniosAprobadosPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilConfiguracionPaginaComponent } from './perfil-configuracion-pagina.component';

describe('PerfilConfiguracionPaginaComponent', () => {
  let component: PerfilConfiguracionPaginaComponent;
  let fixture: ComponentFixture<PerfilConfiguracionPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilConfiguracionPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilConfiguracionPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

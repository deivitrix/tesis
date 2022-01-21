import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarConveniosPaginaComponent } from './modificar-convenios-pagina.component';

describe('ModificarConveniosPaginaComponent', () => {
  let component: ModificarConveniosPaginaComponent;
  let fixture: ComponentFixture<ModificarConveniosPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarConveniosPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarConveniosPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

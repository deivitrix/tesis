import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPaginaPrincipalComponent } from './modificar-pagina-principal.component';

describe('ModificarPaginaPrincipalComponent', () => {
  let component: ModificarPaginaPrincipalComponent;
  let fixture: ComponentFixture<ModificarPaginaPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarPaginaPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarPaginaPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

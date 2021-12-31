import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilPaginaComponent } from './perfil-pagina.component';

describe('PerfilPaginaComponent', () => {
  let component: PerfilPaginaComponent;
  let fixture: ComponentFixture<PerfilPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

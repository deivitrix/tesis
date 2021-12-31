import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecavirtualPaginaComponent } from './bibliotecavirtual-pagina.component';

describe('BibliotecavirtualPaginaComponent', () => {
  let component: BibliotecavirtualPaginaComponent;
  let fixture: ComponentFixture<BibliotecavirtualPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BibliotecavirtualPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BibliotecavirtualPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroactividadesPaginaComponent } from './registroactividades-pagina.component';

describe('RegistroactividadesPaginaComponent', () => {
  let component: RegistroactividadesPaginaComponent;
  let fixture: ComponentFixture<RegistroactividadesPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroactividadesPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroactividadesPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

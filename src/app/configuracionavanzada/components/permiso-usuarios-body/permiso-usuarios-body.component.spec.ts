import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisoUsuariosBodyComponent } from './permiso-usuarios-body.component';

describe('PermisoUsuariosBodyComponent', () => {
  let component: PermisoUsuariosBodyComponent;
  let fixture: ComponentFixture<PermisoUsuariosBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermisoUsuariosBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisoUsuariosBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

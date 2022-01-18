import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarConveniosPaginasComponent } from './modificar-convenios-paginas.component';

describe('ModificarConveniosPaginasComponent', () => {
  let component: ModificarConveniosPaginasComponent;
  let fixture: ComponentFixture<ModificarConveniosPaginasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarConveniosPaginasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarConveniosPaginasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

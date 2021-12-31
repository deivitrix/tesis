import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarConveniosPaginasComponent } from './mostrar-convenios-paginas.component';

describe('MostrarConveniosPaginasComponent', () => {
  let component: MostrarConveniosPaginasComponent;
  let fixture: ComponentFixture<MostrarConveniosPaginasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarConveniosPaginasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarConveniosPaginasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

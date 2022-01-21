import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirConveniosPaginaComponent } from './subir-convenios-pagina.component';

describe('SubirConveniosPaginaComponent', () => {
  let component: SubirConveniosPaginaComponent;
  let fixture: ComponentFixture<SubirConveniosPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubirConveniosPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirConveniosPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

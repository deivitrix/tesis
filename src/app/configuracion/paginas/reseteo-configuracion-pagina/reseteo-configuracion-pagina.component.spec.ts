import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReseteoConfiguracionPaginaComponent } from './reseteo-configuracion-pagina.component';

describe('ReseteoConfiguracionPaginaComponent', () => {
  let component: ReseteoConfiguracionPaginaComponent;
  let fixture: ComponentFixture<ReseteoConfiguracionPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReseteoConfiguracionPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReseteoConfiguracionPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

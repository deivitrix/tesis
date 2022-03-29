import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablabecasAprobadoComponent } from './tablabecas-aprobado.component';

describe('TablabecasAprobadoComponent', () => {
  let component: TablabecasAprobadoComponent;
  let fixture: ComponentFixture<TablabecasAprobadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablabecasAprobadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablabecasAprobadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

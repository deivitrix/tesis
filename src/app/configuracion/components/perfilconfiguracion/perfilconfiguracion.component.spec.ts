import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilconfiguracionComponent } from './perfilconfiguracion.component';

describe('PerfilconfiguracionComponent', () => {
  let component: PerfilconfiguracionComponent;
  let fixture: ComponentFixture<PerfilconfiguracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilconfiguracionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilconfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

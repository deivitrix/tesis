import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeconfiguracionComponent } from './mensajeconfiguracion.component';

describe('MensajeconfiguracionComponent', () => {
  let component: MensajeconfiguracionComponent;
  let fixture: ComponentFixture<MensajeconfiguracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeconfiguracionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeconfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

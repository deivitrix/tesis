import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeLoginComponent } from './mensaje-login.component';

describe('MensajeLoginComponent', () => {
  let component: MensajeLoginComponent;
  let fixture: ComponentFixture<MensajeLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

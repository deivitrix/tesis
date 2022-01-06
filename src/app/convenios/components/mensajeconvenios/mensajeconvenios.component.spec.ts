import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeconveniosComponent } from './mensajeconvenios.component';

describe('MensajeconveniosComponent', () => {
  let component: MensajeconveniosComponent;
  let fixture: ComponentFixture<MensajeconveniosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeconveniosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeconveniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

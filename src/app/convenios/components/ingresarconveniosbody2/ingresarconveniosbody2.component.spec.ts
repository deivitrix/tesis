import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ingresarconveniosbody2Component } from './ingresarconveniosbody2.component';

describe('Ingresarconveniosbody2Component', () => {
  let component: Ingresarconveniosbody2Component;
  let fixture: ComponentFixture<Ingresarconveniosbody2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ingresarconveniosbody2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Ingresarconveniosbody2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

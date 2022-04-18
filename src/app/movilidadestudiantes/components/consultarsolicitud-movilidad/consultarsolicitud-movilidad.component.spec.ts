/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConsultarsolicitudMovilidadComponent } from './consultarsolicitud-movilidad.component';

describe('ConsultarsolicitudMovilidadComponent', () => {
  let component: ConsultarsolicitudMovilidadComponent;
  let fixture: ComponentFixture<ConsultarsolicitudMovilidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarsolicitudMovilidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarsolicitudMovilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

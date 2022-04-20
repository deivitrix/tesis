/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConsultarsolicitudesBecasComponent } from './consultarsolicitudes-becas.component';

describe('ConsultarsolicitudesBecasComponent', () => {
  let component: ConsultarsolicitudesBecasComponent;
  let fixture: ComponentFixture<ConsultarsolicitudesBecasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarsolicitudesBecasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarsolicitudesBecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

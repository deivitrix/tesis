/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SpinneringresobecasComponent } from './spinneringresobecas.component';

describe('SpinneringresobecasComponent', () => {
  let component: SpinneringresobecasComponent;
  let fixture: ComponentFixture<SpinneringresobecasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinneringresobecasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinneringresobecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

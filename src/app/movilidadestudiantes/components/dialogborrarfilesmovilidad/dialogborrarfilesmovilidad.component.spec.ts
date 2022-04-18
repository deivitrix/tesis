/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DialogborrarfilesmovilidadComponent } from './dialogborrarfilesmovilidad.component';

describe('DialogborrarfilesmovilidadComponent', () => {
  let component: DialogborrarfilesmovilidadComponent;
  let fixture: ComponentFixture<DialogborrarfilesmovilidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogborrarfilesmovilidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogborrarfilesmovilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

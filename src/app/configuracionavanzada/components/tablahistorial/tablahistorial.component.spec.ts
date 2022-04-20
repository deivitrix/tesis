/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TablahistorialComponent } from './tablahistorial.component';

describe('TablahistorialComponent', () => {
  let component: TablahistorialComponent;
  let fixture: ComponentFixture<TablahistorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablahistorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablahistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

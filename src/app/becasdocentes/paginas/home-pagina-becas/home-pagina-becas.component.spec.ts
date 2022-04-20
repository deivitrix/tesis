/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HomePaginaBecasComponent } from './home-pagina-becas.component';

describe('HomePaginaBecasComponent', () => {
  let component: HomePaginaBecasComponent;
  let fixture: ComponentFixture<HomePaginaBecasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePaginaBecasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePaginaBecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

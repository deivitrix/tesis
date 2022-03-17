import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasemovilidadComponent } from './basemovilidad.component';

describe('BasemovilidadComponent', () => {
  let component: BasemovilidadComponent;
  let fixture: ComponentFixture<BasemovilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasemovilidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasemovilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

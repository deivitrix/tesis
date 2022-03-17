import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnermovilidadComponent } from './spinnermovilidad.component';

describe('SpinnermovilidadComponent', () => {
  let component: SpinnermovilidadComponent;
  let fixture: ComponentFixture<SpinnermovilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnermovilidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnermovilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerconveniosComponent } from './spinnerconvenios.component';

describe('SpinnerconveniosComponent', () => {
  let component: SpinnerconveniosComponent;
  let fixture: ComponentFixture<SpinnerconveniosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerconveniosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerconveniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

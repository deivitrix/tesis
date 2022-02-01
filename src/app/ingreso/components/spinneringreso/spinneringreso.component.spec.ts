import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinneringresoComponent } from './spinneringreso.component';

describe('SpinneringresoComponent', () => {
  let component: SpinneringresoComponent;
  let fixture: ComponentFixture<SpinneringresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinneringresoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinneringresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

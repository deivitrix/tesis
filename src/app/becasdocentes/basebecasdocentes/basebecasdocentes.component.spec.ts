import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasebecasdocentesComponent } from './basebecasdocentes.component';

describe('BasebecasdocentesComponent', () => {
  let component: BasebecasdocentesComponent;
  let fixture: ComponentFixture<BasebecasdocentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasebecasdocentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasebecasdocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

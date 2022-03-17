import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasebecasComponent } from './basebecas.component';

describe('BasebecasComponent', () => {
  let component: BasebecasComponent;
  let fixture: ComponentFixture<BasebecasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasebecasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasebecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

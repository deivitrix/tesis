import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogingresarbecasComponent } from './dialogingresarbecas.component';

describe('DialogingresarbecasComponent', () => {
  let component: DialogingresarbecasComponent;
  let fixture: ComponentFixture<DialogingresarbecasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogingresarbecasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogingresarbecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

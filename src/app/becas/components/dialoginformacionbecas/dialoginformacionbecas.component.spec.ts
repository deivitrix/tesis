import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoginformacionbecasComponent } from './dialoginformacionbecas.component';

describe('DialoginformacionbecasComponent', () => {
  let component: DialoginformacionbecasComponent;
  let fixture: ComponentFixture<DialoginformacionbecasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialoginformacionbecasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialoginformacionbecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

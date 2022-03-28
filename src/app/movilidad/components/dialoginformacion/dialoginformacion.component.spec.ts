import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoginformacionComponent } from './dialoginformacion.component';

describe('DialoginformacionComponent', () => {
  let component: DialoginformacionComponent;
  let fixture: ComponentFixture<DialoginformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialoginformacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialoginformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

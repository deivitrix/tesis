import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogsolicitudbecasComponent } from './dialogsolicitudbecas.component';

describe('DialogsolicitudbecasComponent', () => {
  let component: DialogsolicitudbecasComponent;
  let fixture: ComponentFixture<DialogsolicitudbecasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogsolicitudbecasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogsolicitudbecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

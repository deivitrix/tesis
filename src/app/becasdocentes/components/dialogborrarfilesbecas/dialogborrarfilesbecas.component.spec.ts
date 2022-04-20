import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogborrarfilesbecasComponent } from './dialogborrarfilesbecas.component';

describe('DialogborrarfilesbecasComponent', () => {
  let component: DialogborrarfilesbecasComponent;
  let fixture: ComponentFixture<DialogborrarfilesbecasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogborrarfilesbecasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogborrarfilesbecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

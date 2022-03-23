import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogborrarfilesComponent } from './dialogborrarfiles.component';

describe('DialogborrarfilesComponent', () => {
  let component: DialogborrarfilesComponent;
  let fixture: ComponentFixture<DialogborrarfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogborrarfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogborrarfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

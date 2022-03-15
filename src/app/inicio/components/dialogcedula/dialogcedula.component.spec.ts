import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcedulaComponent } from './dialogcedula.component';

describe('DialogcedulaComponent', () => {
  let component: DialogcedulaComponent;
  let fixture: ComponentFixture<DialogcedulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogcedulaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogcedulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

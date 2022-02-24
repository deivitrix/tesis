import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogingresarbecasbodyComponent } from './dialogingresarbecasbody.component';

describe('DialogingresarbecasbodyComponent', () => {
  let component: DialogingresarbecasbodyComponent;
  let fixture: ComponentFixture<DialogingresarbecasbodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogingresarbecasbodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogingresarbecasbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

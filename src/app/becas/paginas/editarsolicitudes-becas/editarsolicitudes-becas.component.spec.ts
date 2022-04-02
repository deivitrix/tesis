import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarsolicitudesBecasComponent } from './editarsolicitudes-becas.component';

describe('EditarsolicitudesBecasComponent', () => {
  let component: EditarsolicitudesBecasComponent;
  let fixture: ComponentFixture<EditarsolicitudesBecasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarsolicitudesBecasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarsolicitudesBecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

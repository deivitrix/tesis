import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarsolicitudesBecasComponenteComponent } from './editarsolicitudes-becas-componente.component';

describe('EditarsolicitudesBecasComponenteComponent', () => {
  let component: EditarsolicitudesBecasComponenteComponent;
  let fixture: ComponentFixture<EditarsolicitudesBecasComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarsolicitudesBecasComponenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarsolicitudesBecasComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

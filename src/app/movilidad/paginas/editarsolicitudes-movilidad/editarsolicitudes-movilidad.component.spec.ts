import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarsolicitudesMovilidadComponent } from './editarsolicitudes-movilidad.component';

describe('EditarsolicitudesMovilidadComponent', () => {
  let component: EditarsolicitudesMovilidadComponent;
  let fixture: ComponentFixture<EditarsolicitudesMovilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarsolicitudesMovilidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarsolicitudesMovilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

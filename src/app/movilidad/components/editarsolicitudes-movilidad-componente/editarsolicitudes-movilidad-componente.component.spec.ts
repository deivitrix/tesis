import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarsolicitudesMovilidadComponenteComponent } from './editarsolicitudes-movilidad-componente.component';

describe('EditarsolicitudesMovilidadComponenteComponent', () => {
  let component: EditarsolicitudesMovilidadComponenteComponent;
  let fixture: ComponentFixture<EditarsolicitudesMovilidadComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarsolicitudesMovilidadComponenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarsolicitudesMovilidadComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

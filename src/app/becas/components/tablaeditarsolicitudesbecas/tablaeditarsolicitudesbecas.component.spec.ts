import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaeditarsolicitudesbecasComponent } from './tablaeditarsolicitudesbecas.component';

describe('TablaeditarsolicitudesbecasComponent', () => {
  let component: TablaeditarsolicitudesbecasComponent;
  let fixture: ComponentFixture<TablaeditarsolicitudesbecasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaeditarsolicitudesbecasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaeditarsolicitudesbecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

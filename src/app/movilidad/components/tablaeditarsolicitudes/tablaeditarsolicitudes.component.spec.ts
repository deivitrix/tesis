import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaeditarsolicitudesComponent } from './tablaeditarsolicitudes.component';

describe('TablaeditarsolicitudesComponent', () => {
  let component: TablaeditarsolicitudesComponent;
  let fixture: ComponentFixture<TablaeditarsolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaeditarsolicitudesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaeditarsolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

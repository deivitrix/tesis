import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablabecasnivelComponent } from './tablabecasnivel.component';

describe('TablabecasnivelComponent', () => {
  let component: TablabecasnivelComponent;
  let fixture: ComponentFixture<TablabecasnivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablabecasnivelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablabecasnivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

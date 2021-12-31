import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecasnivelComponent } from './becasnivel.component';

describe('BecasnivelComponent', () => {
  let component: BecasnivelComponent;
  let fixture: ComponentFixture<BecasnivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BecasnivelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BecasnivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

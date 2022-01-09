import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReseteoContraComponent } from './reseteo-contra.component';

describe('ReseteoContraComponent', () => {
  let component: ReseteoContraComponent;
  let fixture: ComponentFixture<ReseteoContraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReseteoContraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReseteoContraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

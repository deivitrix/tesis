import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReseteocontraComponent } from './reseteocontra.component';

describe('ReseteocontraComponent', () => {
  let component: ReseteocontraComponent;
  let fixture: ComponentFixture<ReseteocontraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReseteocontraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReseteocontraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

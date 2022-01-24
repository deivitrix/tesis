import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingloginComponent } from './loadinglogin.component';

describe('LoadingloginComponent', () => {
  let component: LoadingloginComponent;
  let fixture: ComponentFixture<LoadingloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

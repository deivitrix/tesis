import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingconveniosComponent } from './loadingconvenios.component';

describe('LoadingconveniosComponent', () => {
  let component: LoadingconveniosComponent;
  let fixture: ComponentFixture<LoadingconveniosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingconveniosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingconveniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

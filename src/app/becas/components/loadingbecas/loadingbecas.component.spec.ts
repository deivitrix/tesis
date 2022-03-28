import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingbecasComponent } from './loadingbecas.component';

describe('LoadingbecasComponent', () => {
  let component: LoadingbecasComponent;
  let fixture: ComponentFixture<LoadingbecasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingbecasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingbecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

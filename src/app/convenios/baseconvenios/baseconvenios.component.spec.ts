import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseconveniosComponent } from './baseconvenios.component';

describe('BaseconveniosComponent', () => {
  let component: BaseconveniosComponent;
  let fixture: ComponentFixture<BaseconveniosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseconveniosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseconveniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

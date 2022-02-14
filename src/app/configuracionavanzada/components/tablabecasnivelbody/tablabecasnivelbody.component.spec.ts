import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablabecasnivelbodyComponent } from './tablabecasnivelbody.component';

describe('TablabecasnivelbodyComponent', () => {
  let component: TablabecasnivelbodyComponent;
  let fixture: ComponentFixture<TablabecasnivelbodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablabecasnivelbodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablabecasnivelbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

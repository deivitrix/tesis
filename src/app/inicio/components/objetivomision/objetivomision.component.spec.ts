import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetivomisionComponent } from './objetivomision.component';

describe('ObjetivomisionComponent', () => {
  let component: ObjetivomisionComponent;
  let fixture: ComponentFixture<ObjetivomisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjetivomisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjetivomisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

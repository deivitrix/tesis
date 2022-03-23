import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerinicioComponent } from './spinnerinicio.component';

describe('SpinnerinicioComponent', () => {
  let component: SpinnerinicioComponent;
  let fixture: ComponentFixture<SpinnerinicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerinicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerinicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

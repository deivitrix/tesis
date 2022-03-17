import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerbecasComponent } from './spinnerbecas.component';

describe('SpinnerbecasComponent', () => {
  let component: SpinnerbecasComponent;
  let fixture: ComponentFixture<SpinnerbecasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerbecasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerbecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

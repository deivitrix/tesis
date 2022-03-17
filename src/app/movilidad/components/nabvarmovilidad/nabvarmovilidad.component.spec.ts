import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NabvarmovilidadComponent } from './nabvarmovilidad.component';

describe('NabvarmovilidadComponent', () => {
  let component: NabvarmovilidadComponent;
  let fixture: ComponentFixture<NabvarmovilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NabvarmovilidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NabvarmovilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

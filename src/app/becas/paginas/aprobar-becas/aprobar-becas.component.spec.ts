import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarBecasComponent } from './aprobar-becas.component';

describe('AprobarBecasComponent', () => {
  let component: AprobarBecasComponent;
  let fixture: ComponentFixture<AprobarBecasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprobarBecasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobarBecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

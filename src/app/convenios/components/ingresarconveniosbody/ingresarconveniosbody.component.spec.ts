import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarconveniosbodyComponent } from './ingresarconveniosbody.component';

describe('IngresarconveniosbodyComponent', () => {
  let component: IngresarconveniosbodyComponent;
  let fixture: ComponentFixture<IngresarconveniosbodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresarconveniosbodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarconveniosbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReseteoconfiguracionComponent } from './reseteoconfiguracion.component';

describe('ReseteoconfiguracionComponent', () => {
  let component: ReseteoconfiguracionComponent;
  let fixture: ComponentFixture<ReseteoconfiguracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReseteoconfiguracionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReseteoconfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerconfiguracionComponent } from './spinnerconfiguracion.component';

describe('SpinnerconfiguracionComponent', () => {
  let component: SpinnerconfiguracionComponent;
  let fixture: ComponentFixture<SpinnerconfiguracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerconfiguracionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerconfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

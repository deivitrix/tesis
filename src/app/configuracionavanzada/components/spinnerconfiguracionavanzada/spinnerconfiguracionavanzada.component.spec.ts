import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerconfiguracionavanzadaComponent } from './spinnerconfiguracionavanzada.component';

describe('SpinnerconfiguracionavanzadaComponent', () => {
  let component: SpinnerconfiguracionavanzadaComponent;
  let fixture: ComponentFixture<SpinnerconfiguracionavanzadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerconfiguracionavanzadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerconfiguracionavanzadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

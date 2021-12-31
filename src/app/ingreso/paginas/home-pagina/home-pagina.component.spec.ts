import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePaginaComponent } from './home-pagina.component';

describe('HomePaginaComponent', () => {
  let component: HomePaginaComponent;
  let fixture: ComponentFixture<HomePaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

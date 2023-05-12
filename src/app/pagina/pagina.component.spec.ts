import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaComponent } from './pagina.component';

describe('PaginaComponent', () => {
  let component: PaginaComponent;
  let fixture: ComponentFixture<PaginaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginaComponent]
    });
    fixture = TestBed.createComponent(PaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

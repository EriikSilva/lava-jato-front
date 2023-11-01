import { GestaoComponent } from './gestao.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('GestaoComponent', () => {
  let component: GestaoComponent;
  let fixture: ComponentFixture<GestaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestaoComponent]
    });
    fixture = TestBed.createComponent(GestaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

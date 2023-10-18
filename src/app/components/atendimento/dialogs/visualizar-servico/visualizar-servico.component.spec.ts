import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarServicoComponent } from './visualizar-servico.component';

describe('VisualizarServicoComponent', () => {
  let component: VisualizarServicoComponent;
  let fixture: ComponentFixture<VisualizarServicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizarServicoComponent]
    });
    fixture = TestBed.createComponent(VisualizarServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

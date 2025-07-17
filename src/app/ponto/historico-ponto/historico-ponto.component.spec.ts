import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoPontoComponent } from './historico-ponto.component';

describe('HistoricoPontoComponent', () => {
  let component: HistoricoPontoComponent;
  let fixture: ComponentFixture<HistoricoPontoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoPontoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoPontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AguardeAprovacaoComponent } from './aguarde-aprovacao.component';

describe('AguardeAprovacaoComponent', () => {
  let component: AguardeAprovacaoComponent;
  let fixture: ComponentFixture<AguardeAprovacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AguardeAprovacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AguardeAprovacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

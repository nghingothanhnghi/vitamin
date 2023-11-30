import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitAnalysisComponent } from './benefit-analysis.component';

describe('BenefitAnalysisComponent', () => {
  let component: BenefitAnalysisComponent;
  let fixture: ComponentFixture<BenefitAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenefitAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenefitAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

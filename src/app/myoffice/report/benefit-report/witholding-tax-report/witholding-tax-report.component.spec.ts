import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WitholdingTaxReportComponent } from './witholding-tax-report.component';

describe('WitholdingTaxReportComponent', () => {
  let component: WitholdingTaxReportComponent;
  let fixture: ComponentFixture<WitholdingTaxReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WitholdingTaxReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WitholdingTaxReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

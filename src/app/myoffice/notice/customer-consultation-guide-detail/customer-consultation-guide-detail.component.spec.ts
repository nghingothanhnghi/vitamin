import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerConsultationGuideDetailComponent } from './customer-consultation-guide-detail.component';

describe('CustomerConsultationGuideDetailComponent', () => {
  let component: CustomerConsultationGuideDetailComponent;
  let fixture: ComponentFixture<CustomerConsultationGuideDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerConsultationGuideDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerConsultationGuideDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

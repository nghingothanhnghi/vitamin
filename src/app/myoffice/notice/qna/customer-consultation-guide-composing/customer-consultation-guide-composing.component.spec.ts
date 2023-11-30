import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerConsultationGuideComposingComponent } from './customer-consultation-guide-composing.component';

describe('CustomerConsultationGuideComposingComponent', () => {
  let component: CustomerConsultationGuideComposingComponent;
  let fixture: ComponentFixture<CustomerConsultationGuideComposingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerConsultationGuideComposingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerConsultationGuideComposingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

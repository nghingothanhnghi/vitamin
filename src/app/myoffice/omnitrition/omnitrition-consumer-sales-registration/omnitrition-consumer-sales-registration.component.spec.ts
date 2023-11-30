import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmnitritionConsumerSalesRegistrationComponent } from './omnitrition-consumer-sales-registration.component';

describe('OmnitritionConsumerSalesRegistrationComponent', () => {
  let component: OmnitritionConsumerSalesRegistrationComponent;
  let fixture: ComponentFixture<OmnitritionConsumerSalesRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmnitritionConsumerSalesRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmnitritionConsumerSalesRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

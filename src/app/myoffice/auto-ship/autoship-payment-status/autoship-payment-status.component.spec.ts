import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoshipPaymentStatusComponent } from './autoship-payment-status.component';

describe('AutoshipPaymentStatusComponent', () => {
  let component: AutoshipPaymentStatusComponent;
  let fixture: ComponentFixture<AutoshipPaymentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoshipPaymentStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoshipPaymentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

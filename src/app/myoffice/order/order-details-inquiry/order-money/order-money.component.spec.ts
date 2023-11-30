import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMoneyComponent } from './order-money.component';

describe('OrderMoneyComponent', () => {
  let component: OrderMoneyComponent;
  let fixture: ComponentFixture<OrderMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderMoneyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

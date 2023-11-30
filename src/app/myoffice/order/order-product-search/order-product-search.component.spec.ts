import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProductSearchComponent } from './order-product-search.component';

describe('OrderProductSearchComponent', () => {
  let component: OrderProductSearchComponent;
  let fixture: ComponentFixture<OrderProductSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderProductSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderProductSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

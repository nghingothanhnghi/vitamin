import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSearchGridComponent } from './order-search-grid.component';

describe('OrderSearchGridComponent', () => {
  let component: OrderSearchGridComponent;
  let fixture: ComponentFixture<OrderSearchGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSearchGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderSearchGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

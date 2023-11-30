import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubOrderSearchFilterComponent } from './sub-order-search-filter.component';

describe('SubOrderSearchFilterComponent', () => {
  let component: SubOrderSearchFilterComponent;
  let fixture: ComponentFixture<SubOrderSearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubOrderSearchFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubOrderSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

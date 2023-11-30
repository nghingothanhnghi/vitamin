import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubOrderSearchGridComponent } from './sub-order-search-grid.component';

describe('SubOrderSearchGridComponent', () => {
  let component: SubOrderSearchGridComponent;
  let fixture: ComponentFixture<SubOrderSearchGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubOrderSearchGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubOrderSearchGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

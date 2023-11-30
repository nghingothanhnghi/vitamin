import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubOrderSearchComponent } from './sub-order-search.component';

describe('SubOrderSearchComponent', () => {
  let component: SubOrderSearchComponent;
  let fixture: ComponentFixture<SubOrderSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubOrderSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubOrderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

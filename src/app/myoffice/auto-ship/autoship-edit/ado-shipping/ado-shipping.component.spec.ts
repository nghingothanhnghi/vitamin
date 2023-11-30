import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoShippingComponent } from './ado-shipping.component';

describe('AdoShippingComponent', () => {
  let component: AdoShippingComponent;
  let fixture: ComponentFixture<AdoShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdoShippingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

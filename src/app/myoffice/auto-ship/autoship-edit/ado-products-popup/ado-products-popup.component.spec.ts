import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoProductsPopupComponent } from './ado-products-popup.component';

describe('AdoProductsPopupComponent', () => {
  let component: AdoProductsPopupComponent;
  let fixture: ComponentFixture<AdoProductsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdoProductsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoProductsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

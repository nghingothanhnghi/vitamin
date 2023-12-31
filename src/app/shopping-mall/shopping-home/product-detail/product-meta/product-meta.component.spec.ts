import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMetaComponent } from './product-meta.component';

describe('ProductMetaComponent', () => {
  let component: ProductMetaComponent;
  let fixture: ComponentFixture<ProductMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductMetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

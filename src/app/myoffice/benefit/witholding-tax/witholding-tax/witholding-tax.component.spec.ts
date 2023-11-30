import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WitholdingTaxComponent } from './witholding-tax.component';

describe('WitholdingTaxComponent', () => {
  let component: WitholdingTaxComponent;
  let fixture: ComponentFixture<WitholdingTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WitholdingTaxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WitholdingTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

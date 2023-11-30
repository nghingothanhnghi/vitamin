import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoPaymemntComponent } from './ado-paymemnt.component';

describe('AdoPaymemntComponent', () => {
  let component: AdoPaymemntComponent;
  let fixture: ComponentFixture<AdoPaymemntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdoPaymemntComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoPaymemntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

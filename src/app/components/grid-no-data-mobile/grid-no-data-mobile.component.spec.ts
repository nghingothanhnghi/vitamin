import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridNoDataMobileComponent } from './grid-no-data-mobile.component';

describe('GridNoDataMobileComponent', () => {
  let component: GridNoDataMobileComponent;
  let fixture: ComponentFixture<GridNoDataMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridNoDataMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridNoDataMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

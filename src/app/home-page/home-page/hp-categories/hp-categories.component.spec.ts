import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HpCategoriesComponent } from './hp-categories.component';

describe('HpCategoriesComponent', () => {
  let component: HpCategoriesComponent;
  let fixture: ComponentFixture<HpCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HpCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HpCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

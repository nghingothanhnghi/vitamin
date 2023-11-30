import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsDoComponent } from './os.do.component';

describe('OsDoComponent', () => {
  let component: OsDoComponent;
  let fixture: ComponentFixture<OsDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsDoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

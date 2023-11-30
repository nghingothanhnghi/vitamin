import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyofficeHomeComponent } from './myoffice-home.component';

describe('MyofficeHomeComponent', () => {
  let component: MyofficeHomeComponent;
  let fixture: ComponentFixture<MyofficeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyofficeHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyofficeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

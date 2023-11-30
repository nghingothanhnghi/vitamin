import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivesDetailComponent } from './archives-detail.component';

describe('ArchivesDetailComponent', () => {
  let component: ArchivesDetailComponent;
  let fixture: ComponentFixture<ArchivesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivesDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

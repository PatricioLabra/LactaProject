import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MothersViewComponent } from './mothers-view.component';

describe('MothersViewComponent', () => {
  let component: MothersViewComponent;
  let fixture: ComponentFixture<MothersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MothersViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MothersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

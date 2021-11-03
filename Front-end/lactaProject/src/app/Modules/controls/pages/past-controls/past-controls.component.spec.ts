import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastControlsComponent } from './past-controls.component';

describe('PastControlsComponent', () => {
  let component: PastControlsComponent;
  let fixture: ComponentFixture<PastControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

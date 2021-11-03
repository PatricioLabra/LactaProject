import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlsListComponent } from './controls-list.component';

describe('ControlsListComponent', () => {
  let component: ControlsListComponent;
  let fixture: ComponentFixture<ControlsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StadisticsPanelComponent } from './stadistics-panel.component';

describe('StadisticsPanelComponent', () => {
  let component: StadisticsPanelComponent;
  let fixture: ComponentFixture<StadisticsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StadisticsPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StadisticsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalsViewComponent } from './professionals-view.component';

describe('ProfessionalsViewComponent', () => {
  let component: ProfessionalsViewComponent;
  let fixture: ComponentFixture<ProfessionalsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionalsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

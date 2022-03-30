import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalDataComponent } from './professional-data.component';

describe('ProfessionalDataComponent', () => {
  let component: ProfessionalDataComponent;
  let fixture: ComponentFixture<ProfessionalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionalDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

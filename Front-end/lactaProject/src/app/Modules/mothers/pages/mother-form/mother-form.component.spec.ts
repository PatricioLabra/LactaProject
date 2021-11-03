import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotherFormComponent } from './mother-form.component';

describe('MotherFormComponent', () => {
  let component: MotherFormComponent;
  let fixture: ComponentFixture<MotherFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotherFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotherFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

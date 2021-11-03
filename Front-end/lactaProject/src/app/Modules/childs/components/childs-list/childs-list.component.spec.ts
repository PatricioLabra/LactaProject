import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildsListComponent } from './childs-list.component';

describe('ChildsListComponent', () => {
  let component: ChildsListComponent;
  let fixture: ComponentFixture<ChildsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

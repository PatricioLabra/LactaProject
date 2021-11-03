import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostloginViewComponent } from './postlogin-view.component';

describe('PostloginViewComponent', () => {
  let component: PostloginViewComponent;
  let fixture: ComponentFixture<PostloginViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostloginViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostloginViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneblogComponent } from './oneblog.component';

describe('OneblogComponent', () => {
  let component: OneblogComponent;
  let fixture: ComponentFixture<OneblogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneblogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

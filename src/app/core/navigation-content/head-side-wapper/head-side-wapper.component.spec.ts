import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadSideWapperComponent } from './head-side-wapper.component';

describe('HeadSideWapperComponent', () => {
  let component: HeadSideWapperComponent;
  let fixture: ComponentFixture<HeadSideWapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeadSideWapperComponent]
    });
    fixture = TestBed.createComponent(HeadSideWapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

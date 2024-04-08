import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadSidenavWrapperComponent } from './head-sidenav-wrapper.component';

describe('HeadSidenavWrapperComponent', () => {
  let component: HeadSidenavWrapperComponent;
  let fixture: ComponentFixture<HeadSidenavWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeadSidenavWrapperComponent]
    });
    fixture = TestBed.createComponent(HeadSidenavWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

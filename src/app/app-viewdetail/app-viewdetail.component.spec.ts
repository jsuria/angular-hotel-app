import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppViewdetailComponent } from './app-viewdetail.component';

describe('AppViewdetailComponent', () => {
  let component: AppViewdetailComponent;
  let fixture: ComponentFixture<AppViewdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppViewdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppViewdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

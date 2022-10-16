import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingsSearchComponent } from './listings-search.component';

describe('ListingsSearchComponent', () => {
  let component: ListingsSearchComponent;
  let fixture: ComponentFixture<ListingsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingsSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

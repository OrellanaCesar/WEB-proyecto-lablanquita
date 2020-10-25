import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableCategoryComponent } from './data-table-category.component';

describe('DataTableCategoryComponent', () => {
  let component: DataTableCategoryComponent;
  let fixture: ComponentFixture<DataTableCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

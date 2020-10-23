import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableBrandComponent } from './data-table-brand.component';

describe('DataTableBrandComponent', () => {
  let component: DataTableBrandComponent;
  let fixture: ComponentFixture<DataTableBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadcsvComponent } from './loadcsv.component';

describe('LoadcsvComponent', () => {
  let component: LoadcsvComponent;
  let fixture: ComponentFixture<LoadcsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadcsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadcsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

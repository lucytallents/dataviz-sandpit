import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcExampleComponent } from './dc-example.component';

describe('DcExampleComponent', () => {
  let component: DcExampleComponent;
  let fixture: ComponentFixture<DcExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

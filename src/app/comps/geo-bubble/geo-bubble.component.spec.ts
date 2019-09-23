import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoBubbleComponent } from './geo-bubble.component';

describe('GeoBubbleComponent', () => {
  let component: GeoBubbleComponent;
  let fixture: ComponentFixture<GeoBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

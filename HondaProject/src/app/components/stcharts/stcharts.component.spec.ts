import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StchartsComponent } from './stcharts.component';

describe('StchartsComponent', () => {
  let component: StchartsComponent;
  let fixture: ComponentFixture<StchartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StchartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

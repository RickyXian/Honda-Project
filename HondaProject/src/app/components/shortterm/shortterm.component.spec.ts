import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShorttermComponent } from './shortterm.component';

describe('ShorttermComponent', () => {
  let component: ShorttermComponent;
  let fixture: ComponentFixture<ShorttermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShorttermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShorttermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListFillerComponent } from './price-list-filler.component';

describe('PriceListFillerComponent', () => {
  let component: PriceListFillerComponent;
  let fixture: ComponentFixture<PriceListFillerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PriceListFillerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceListFillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

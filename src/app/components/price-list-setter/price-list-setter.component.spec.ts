import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListSetterComponent } from './price-list-setter.component';

describe('PriceListSetterrComponent', () => {
  let component: PriceListSetterComponent;
  let fixture: ComponentFixture<PriceListSetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PriceListSetterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceListSetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCheckoutComponent } from './listado-checkout.component';

describe('ListadoCheckoutComponent', () => {
  let component: ListadoCheckoutComponent;
  let fixture: ComponentFixture<ListadoCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoCheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

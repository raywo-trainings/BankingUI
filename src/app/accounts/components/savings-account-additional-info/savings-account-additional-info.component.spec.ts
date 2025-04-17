import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SavingsAccountAdditionalInfoComponent } from "./savings-account-additional-info.component";


describe('SavingsAccountAdditionalInfoComponent', () => {
  let component: SavingsAccountAdditionalInfoComponent;
  let fixture: ComponentFixture<SavingsAccountAdditionalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavingsAccountAdditionalInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavingsAccountAdditionalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

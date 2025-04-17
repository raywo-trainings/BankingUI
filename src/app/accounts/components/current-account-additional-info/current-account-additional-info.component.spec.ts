import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CurrentAccountAdditionalInfoComponent } from "./current-account-additional-info.component";


describe('CurrentAccountAdditionalInfoComponent', () => {
  let component: CurrentAccountAdditionalInfoComponent;
  let fixture: ComponentFixture<CurrentAccountAdditionalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentAccountAdditionalInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentAccountAdditionalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

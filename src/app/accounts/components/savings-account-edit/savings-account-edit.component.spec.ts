import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SavingsAccountEditComponent } from "./savings-account-edit.component";


describe('SavingsAccountEditComponent', () => {
  let component: SavingsAccountEditComponent;
  let fixture: ComponentFixture<SavingsAccountEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavingsAccountEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavingsAccountEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AccountRowViewComponent } from "./account-row-view.component";


describe('AccountRowViewComponent', () => {
  let component: AccountRowViewComponent;
  let fixture: ComponentFixture<AccountRowViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountRowViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountRowViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

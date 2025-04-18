import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CurrentAccountEditComponent } from "./current-account-edit.component";


describe('CurrentAccountEditComponent', () => {
  let component: CurrentAccountEditComponent;
  let fixture: ComponentFixture<CurrentAccountEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentAccountEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentAccountEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EditAccountButtonComponent } from "./edit-account-button.component";


describe('EditAccountButtonComponent', () => {
  let component: EditAccountButtonComponent;
  let fixture: ComponentFixture<EditAccountButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAccountButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAccountButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

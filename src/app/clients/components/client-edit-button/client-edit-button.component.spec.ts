import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientEditButtonComponent } from "./client-edit-button.component";


describe('ClientEditButtonComponent', () => {
  let component: ClientEditButtonComponent;
  let fixture: ComponentFixture<ClientEditButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientEditButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientEditButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

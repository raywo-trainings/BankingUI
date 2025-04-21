import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientDeleteButtonComponent } from "./client-delete-button.component";


describe('ClientDeleteButtonComponent', () => {
  let component: ClientDeleteButtonComponent;
  let fixture: ComponentFixture<ClientDeleteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientDeleteButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDeleteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

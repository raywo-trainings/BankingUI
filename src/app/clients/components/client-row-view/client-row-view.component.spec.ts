import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientRowViewComponent } from "./client-row-view.component";


describe('ClientRowViewComponent', () => {
  let component: ClientRowViewComponent;
  let fixture: ComponentFixture<ClientRowViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientRowViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientRowViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

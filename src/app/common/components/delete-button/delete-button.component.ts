import { Component, ElementRef, HostListener, inject, input, OnInit, output, Renderer2, TemplateRef, ViewChild } from "@angular/core";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { NgTemplateOutlet } from "@angular/common";


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "button[app-delete-button]",
  imports: [
    FaIconComponent,
    NgTemplateOutlet
  ],
  templateUrl: "./delete-button.component.html",
  host: {
    class: "btn btn-danger"
  }
})
export class DeleteButtonComponent implements OnInit {

  private modalService = inject(NgbModal);
  private hostElement = inject(ElementRef);
  private renderer = inject(Renderer2);

  @ViewChild("modalContent", { static: true })
  private modalContent!: TemplateRef<unknown>;

  protected readonly faTrash = faTrashCan;

  public showIcon = input<boolean>(true);
  public caption = input<string>("Löschen");
  public showCaption = input<boolean>(true);
  public deleteConfirmed = output();

  public withConfirmation = input<boolean>(true);
  public confirmationTitle = input<string>();
  public confirmationMessage = input<string | TemplateRef<any>>();


  public ngOnInit() {
    this.renderer.setAttribute(this.hostElement.nativeElement, "type", "button");
  }


  @HostListener("click", ["$event"])
  protected onClickHost(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    const options: NgbModalOptions = {
      ariaLabelledBy: this.caption()
    };

    this.modalService.open(this.modalContent, options)
      .result
      .then(
        (result) => {
          if (result === "Delete") {
            this.deleteConfirmed.emit();
          }
        },
        () => {
          // Do nothing. This exists only to avoid errors in console.
        }
      );
  }


  protected isTemplate(value: string | TemplateRef<any>): value is TemplateRef<any> {
    return value !== undefined && value instanceof TemplateRef;
  }


  protected messageAsTemplate(): TemplateRef<any> | undefined {
    const message = this.confirmationMessage()!;

    return this.isTemplate(message) ? message : undefined;
  }

}

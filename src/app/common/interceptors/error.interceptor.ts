import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, EMPTY } from "rxjs";
import { ApiError } from "../models/api-error.model";
import { inject } from "@angular/core";
import { ToastService } from "../services/toast.service";
import { createToastFromError } from "../models/toast.model";


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorContext = req.headers.get("X-Error-Context") || "Ein Fehler ist aufgetreten";
  const toastService = inject(ToastService);

  return next(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        const apiError: ApiError = error.error;
        apiError.title = errorContext;

        toastService.show(createToastFromError(apiError, 10_000));

        return EMPTY;
      })
    );
};



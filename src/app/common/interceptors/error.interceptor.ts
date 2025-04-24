import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, EMPTY, tap } from "rxjs";
import { ApiError } from "../models/api-error.model";
import { inject } from "@angular/core";
import { ToastService } from "../services/toast.service";
import { createToastFromError } from "../models/toast.model";
import { OnlineStatusService } from "../services/online-status.service";


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorContext = req.headers.get("X-Error-Context") ?? "Ein Fehler ist aufgetreten";
  const toastService = inject(ToastService);
  const statusService = inject(OnlineStatusService);

  return next(req)
    .pipe(
      tap(() => statusService.setOnline()),
      catchError((error: HttpErrorResponse) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        const message = error.error.message;
        const statusText = error.statusText;

        if (message === "Load failed" && statusText === "Unknown Error") {
          statusService.setOffline();
          return EMPTY;
        } else {
          statusService.setOnline();
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const apiError: ApiError = error.error;
        apiError.title = errorContext;

        toastService.show(createToastFromError(apiError, 10_000));

        return EMPTY;
      })
    );
};



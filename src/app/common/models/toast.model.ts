import { TemplateRef } from "@angular/core";
import { ApiError } from "./api-error.model";
import { violationToString } from "./api-violation.model";


export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {

  type: ToastType;
  title?: string;
  message: string | TemplateRef<any>;
  violations?: string[];
  delay?: number;

}


export function createToastFromError(error: ApiError,
                                     delay = 5000,
                                     message?: string): Toast {
  const completeMessage = message ? `${message} – ${error.detail}` : error.detail;

  return {
    type: 'error',
    title: error.title,
    message: completeMessage,
    violations: error.violations?.map(v => violationToString(v)),
    delay
  }
}

export function createErrorToast(message: string,
                                 title?: string,
                                 delay?: number): Toast {
  return {
    type: 'error',
    title,
    message,
    delay
  };
}


export function createSuccessToast(message: string,
                                   title?: string,
                                   delay?: number): Toast {
  return {
    type: 'success',
    title,
    message,
    delay
  }
}

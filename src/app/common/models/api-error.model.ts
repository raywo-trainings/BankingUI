import { ApiViolation } from "./api-violation.model";


export interface ApiError {

  detail: string;
  instance: string;
  status: number;
  title: string;
  type: string;
  violations?: ApiViolation[];

}

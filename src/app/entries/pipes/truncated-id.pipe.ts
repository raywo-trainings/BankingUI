import { Pipe, PipeTransform } from "@angular/core";


export const truncatedId = (value?: string): string => {
  if (!value) return "";

  return value.substring(0, value.indexOf("-"));
};

@Pipe({
  name: "truncatedId"
})
export class TruncatedIdPipe implements PipeTransform {

  transform(value?: string): string {
    return truncatedId(value);
  }

}

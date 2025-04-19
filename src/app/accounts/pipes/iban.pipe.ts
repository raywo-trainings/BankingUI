import { Pipe, PipeTransform } from "@angular/core";


export const ibanFormat = (value?: string): string => {
  if (!value) return "";

  return value.replace(/(\w{2})(\d{2})(\d{4})(\d{4})(\d{4})(\d{4})(\d{2})/,
    "$1$2 $3 $4 $5 $6 $7");
};

@Pipe({
  name: "iban"
})
export class IbanPipe implements PipeTransform {

  transform(value?: string): string {
    return ibanFormat(value);
  }

}

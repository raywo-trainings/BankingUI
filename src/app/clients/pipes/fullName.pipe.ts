import { Pipe, PipeTransform } from "@angular/core";
import { Client } from "../models/client.model";


export function fullName(client?: Client): string {
  if (!client) return "";

  return `${client.firstname} ${client.lastname}`;
}

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(client?: Client): string {
    return fullName(client);
  }

}

import { Pipe, PipeTransform } from "@angular/core";
import { Client } from "../models/client.model";


@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(client: Client): string {
    return `${client.firstname} ${client.lastname}`;
  }

}

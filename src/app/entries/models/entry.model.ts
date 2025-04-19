export type EntryType = "deposit" | "withdraw";

export interface Entry {

  id?: string;
  iban: string;
  amount: number;
  entryDate: Date;
  description: string;
  entryType: EntryType;

}


export interface EntryWriteDTO {

  amount: number;
  entryDate: Date;
  description?: string;
  entryType: EntryType;

}


export function entryDTOFromEntry(entry: Entry): any {
  return {
    iban: entry.iban,
    amount: entry.amount,
    entryDate: entry.entryDate,
    description: entry.description,
    entryType: entry.entryType
  }
}

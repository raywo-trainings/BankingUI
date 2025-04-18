import { Client } from "../../clients/models/client.model";
import { currentAccountDtoFromAccount, CurrentAccountWriteDTO } from "./current-account.model";
import { savingsAccountDtoFromAccount, SavingsAccountWriteDTO } from "./savings-account.model";


export type AccountType = "current" | "savings";

export interface Account {

  iban?: string;
  balance: number;
  owner: Client;
  type: AccountType;

}


export function accountDTOFromAccount(account: Account): CurrentAccountWriteDTO | SavingsAccountWriteDTO {
  switch (account.type) {
    case "current":
      return currentAccountDtoFromAccount(account);
    case "savings":
      return savingsAccountDtoFromAccount(account);
    default:
      throw new Error("Unbekannter Kontotyp");
  }
}

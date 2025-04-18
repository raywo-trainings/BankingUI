import { createEmptyClient } from "../../clients/models/client.model";
import { Account } from "./account.model";


export interface SavingsAccount extends Account {

  interestRate: number;

}


export interface SavingsAccountWriteDTO {

  ownerId: number;
  interestRate: number;

}


export function createEmptySavingsAccount(): SavingsAccount {
  return {
    iban: undefined,
    balance: 0,
    owner: createEmptyClient(),
    type: "savings",
    interestRate: 0
  };
}


export function savingsAccountDtoFromAccount(account: Account): SavingsAccountWriteDTO {
  if (!isSavingsAccount(account)) {
    throw new Error("Account is not a savings account");
  }

  return {
    ownerId: account.owner.id!,
    interestRate: account.interestRate
  };
}

export function isSavingsAccount(account: Account): account is SavingsAccount {
  return account.type === "savings";
}

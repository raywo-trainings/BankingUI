import { Account } from "./account.model";
import { createEmptyClient } from "../../clients/models/client.model";


export interface CurrentAccount extends Account {

  overdraftLimit: number;
  overdraftInterestRate: number;

}

export interface CurrentAccountWriteDTO {

  ownerId: number;
  overdraftLimit: number;
  overdraftInterestRate: number;

}


export function createEmptyCurrentAccount(): CurrentAccount {
  return {
    iban: undefined,
    balance: 0,
    owner: createEmptyClient(),
    type: "current",
    overdraftLimit: 0,
    overdraftInterestRate: 0
  };
}


export function currentAccountDtoFromAccount(account: Account): CurrentAccountWriteDTO {
  if (!isCurrentAccount(account)) {
    throw new Error("Account is not a current account");
  }

  return {
    ownerId: account.owner.id!,
    overdraftLimit: account.overdraftLimit,
    overdraftInterestRate: account.overdraftInterestRate
  };
}


export function isCurrentAccount(account: Account): account is CurrentAccount {
  return account.type === "current";
}

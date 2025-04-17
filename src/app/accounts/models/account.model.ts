import { Client } from "../../clients/models/client.model";


export type AccountType = "current" | "savings";

export interface Account {

  iban: string;
  balance: number;
  owner: Client;
  type: AccountType;

}

export interface CurrentAccount extends Account {

  limit: number;
  interestRate: number;

}


export interface SavingsAccount extends Account {

  interestRate: number;

}


export interface CurrentAccountWriteDTO {

  ownerId: number;
  limit: number;
  interestRate: number;

}


export interface SavingsAccountWriteDTO {

  ownerId: number;
  limit: number;
  interestRate: number;

}


export function isCurrentAccount(account: Account): account is CurrentAccount {
  return account.type === "current";
}

export function isSavingsAccount(account: Account): account is SavingsAccount {
  return account.type === "savings";
}

import { BaseModel } from './base.model';

export interface Address {
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  complement?: string;
}

export enum ClientType {
  Individual = 'Individual',
  Business = 'Business',
}

export interface client {
  id: string;
  name: string;
  document: string; // CPF or CNPJ
  clientType: ClientType;
  birthDate?: string; // Only for individuals
  ie?: string; // Only for businesses
  ieExempt: boolean; // Only for businesses
  phone: string;
  email: string;
  address: Address;
  createdAt: string;
  updatedAt: string;
}

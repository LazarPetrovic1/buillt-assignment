export interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
  balance: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface IItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}

interface LoginUser {
  id: number;
  name: string;
  email: string;
  username: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface LoginReturn {
  token: string;
  user: LoginUser
}

export interface GenericMessage { msg: string; }

export interface ErrMsg {
  msg: string;
  stack: string;
}

export interface Transaction {
  id: number;
  cost: number;
  items: {
    id: number;
    amountOrdered: number;
  }[]
}
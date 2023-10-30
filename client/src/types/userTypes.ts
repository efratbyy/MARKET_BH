export type LoginType = { email: string; password: string };

export type TokenType = {
  _id: string;
  isAdmin: boolean;
  email: string;
  first: string;
  last: string;
};

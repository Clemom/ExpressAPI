export type CreateUserInput = {
  email: string;
  name?: string;
  password: string;
};

export type LoginUserInput = {
  email: string;
  password: string;
};
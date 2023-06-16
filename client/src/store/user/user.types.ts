
type RegisterUserRequest = {
  email: string,
  name: string,
  password: string,
  password_confirmation: string,
}

type UserState = {
  email: string,
  name: string,
  password: string,
  loading: boolean,
}


export type {
  UserState,
  RegisterUserRequest
};

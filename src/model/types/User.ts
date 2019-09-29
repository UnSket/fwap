export type User = {
  firstName: string,
  lastName: string,
  username: string,
  authority: AUTHORITIES,
  id: string,
  active: boolean,
  deckCount: number
}

export enum AUTHORITIES {
  ADMIN = 'ROLE_ADMIN',
  USER = 'ROLE_USER'
};

export type CreateUserForm = {
  username: string,
  active: boolean,
  password: string
  email: string
}

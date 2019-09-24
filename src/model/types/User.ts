export type User = {
  firstName: string,
  lastName: string,
  username: string,
  authorities: Array<Authority>,
  id: string,
  active: boolean
}

type Authority = {
  authority: string
}

export type CreateUserForm = {
  username: string,
  active: boolean,
  password: string
}

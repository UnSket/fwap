export type User = {
  firstName: string,
  lastName: string,
  username: string,
  authorities: Array<Authority>,
  id: number,
  active: boolean
}

type Authority = {
  authority: string
}

export const usersMock: Array<User> = [
  {firstName: 'Ivan', lastName: 'Ivanov', username: 'invanovich', authorities: [{authority: 'ROLE_USER'}], id: 1, active: true},
  {firstName: 'Ivan', lastName: 'Ivanov', username: 'invanovich1', authorities: [{authority: 'ROLE_USER'}], id: 2, active: true},
  {firstName: 'Ivan', lastName: 'Ivanov', username: 'invanovich2', authorities: [{authority: 'ROLE_USER'}], id: 3, active: false},
  {firstName: 'Ivan', lastName: 'Ivanov', username: 'invanovich3', authorities: [{authority: 'ROLE_ADMIN'}], id: 4, active: false},
  {firstName: 'Ivan', lastName: 'Ivanov', username: 'invanovich4', authorities: [{authority: 'ROLE_ADMIN'}], id: 5, active: true},
];

export type User = {
  firstName: string,
  lasName: string,
  username: string,
  authorities: Array<Authority>,
  id: number
}

type Authority = {
  authority: string
}

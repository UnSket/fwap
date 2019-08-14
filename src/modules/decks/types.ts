export type State = {
  loading: boolean,
  decksById: any,
  createdDeckId: number | null,
  error?: string | null
};

export type Action = {
  deck: any;
  error?: string
}

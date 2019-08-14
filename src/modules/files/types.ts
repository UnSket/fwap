export type State = {
  loading: boolean,
  files: Array<string>,
  error?: string | null
};

export type Action = {
  loading: boolean,
  fileUrl: string,
  error?: string | null
};

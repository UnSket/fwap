export interface Pageable<T> {
  content: Array<T>
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  //pageable: {sort: {sorted: false, unsorted: true, empty: true}, offset: 0, pageSize: 20, pageNumber: 0,…}
  size: number
  //sort: {sorted: false, unsorted: true, empty: true}
  totalElements: number
  totalPages: number
};

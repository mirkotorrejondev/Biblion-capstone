export interface BooksParams {
  bibkeys: string;
  format?: string;
  jscmd?: string;
}

export interface SearchParams {
  q?: string;
  title?: string;
  author?: string;
  isbn?: string;
  place?: string;
  person?: string;
  publisher?: string;
  subject?: string;
  page: string;
  limit: string;
  sort: string;
}

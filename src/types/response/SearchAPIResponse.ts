export interface BookSummary {
  author_name: string[];
  cover_i: string;
  title: string;
  first_publish_year: string;
  edition_key: string[];
  cover_edition_key: string;
}

export interface SearchAPIResponse {
  numFound: number;
  q: string;
  docs: BookSummary[];
}

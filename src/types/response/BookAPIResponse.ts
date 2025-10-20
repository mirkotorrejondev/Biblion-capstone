interface Author {
  url: string;
  name: string;
}

interface Identifiers {
  isbn_10: string[];
  isbn_13: string[];
}

interface Publisher {
  name: string;
}

interface Place {
  name: string;
}

interface Subject {
  name: string;
  url: string;
}

interface Link {
  title: string;
  url: string;
}

interface Cover {
  small: string;
  medium: string;
  large: string;
}

interface Book {
  url: string;
  key: string;
  title: string;
  authors: Author[];
  number_of_pages: number;
  pagination: string;
  identifiers: Identifiers;
  publishers: Publisher[];
  publish_places: Place[];
  publish_date: string;
  subjects: Subject[];
  subject_places: Subject[];
  subject_people: Subject[];
  subject_times: Subject[];
  links: Link[];
  cover: Cover;
}

export interface BookAPIResponse {
  [olid: string]: Book;
}

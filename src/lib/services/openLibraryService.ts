import { BooksParams, SearchParams } from "@/types/openLibrary";
import { config } from "../config";

class OpenLibraryService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = config.apis.openLibrary.baseUrl;
  }

  buildBooksUrl(params: BooksParams): string {
    const { bibkeys, format = "json", jscmd = "data" } = params;
    const endpoint = config.apis.openLibrary.endpoints.books;

    const url = new URL(endpoint, this.baseUrl);
    url.searchParams.set("bibkeys", bibkeys);
    url.searchParams.set("format", format);
    url.searchParams.set("jscmd", jscmd);

    return url.toString();
  }

  buildSearchUrl(params: SearchParams): string {
    const {
      q,
      title,
      author,
      subject,
      person,
      place,
      publisher,
      isbn,
      page,
      limit,
      sort,
    } = params;
    const endpoint = config.apis.openLibrary.endpoints.search;
    const url = new URL(endpoint, this.baseUrl);
    url.searchParams.set("page", page);
    url.searchParams.set("limit", limit);
    if (q) {
      url.searchParams.set("q", q);
    }
    if (title) {
      url.searchParams.set("title", title);
    }
    if (author) {
      url.searchParams.set("author", author);
    }
    if (subject) {
      url.searchParams.set("subject", subject);
    }
    if (place) {
      url.searchParams.set("place", place);
    }
    if (isbn) {
      url.searchParams.set("isbn", isbn);
    }
    if (publisher) {
      url.searchParams.set("publisher", publisher);
    }
    if (person) {
      url.searchParams.set("person", person);
    }
    if (sort) {
      url.searchParams.set("sort", sort);
    }

    url.searchParams.set(
      "fields",
      config.apis.openLibrary.fieldsRequired.search.join(","),
    );

    return url.toString();
  }

  async getBook(params: BooksParams) {
    const url = this.buildBooksUrl(params);

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`OpenLibrary API error: ${response.status}`);
    }
    return response.json();
  }

  async searchBooks(params: SearchParams) {
    const url = this.buildSearchUrl(params);

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Open library API error: ${response.status}`);
    }

    return response.json();
  }
}

export const openLibraryService = new OpenLibraryService();

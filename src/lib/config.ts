export const config = {
  apis: {
    openLibrary: {
      baseUrl: process.env.NEXT_PUBLIC_OPENLIBRARY_BASE_URL || "",
      endpoints: {
        books: "/api/books",
        search: "/search.json",
      },
      fieldsRequired: {
        search: [
          "title",
          "cover_i",
          "author_name",
          "first_publish_year",
          "edition_key",
          "cover_edition_key",
        ],
      },
    },
  },
};

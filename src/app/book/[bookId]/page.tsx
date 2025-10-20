"use client";
import useFetch from "@/lib/hooks/useFetch";
import { BookAPIResponse } from "@/types/response/BookAPIResponse";
import Image from "next/image";
import { useMemo } from "react";
import { use } from "react";
import styles from "./page.module.css";

interface Pageprops {
  params: Promise<{
    bookId: string;
  }>;
}

export default function BooksDetails({ params }: Pageprops) {
  const resolvedParams = use(params);
  const bookId = resolvedParams.bookId;

  const url = useMemo(() => {
    const urlParams = new URLSearchParams();
    urlParams.set("bibkeys", "OLID:" + bookId);
    urlParams.set("format", "json");
    urlParams.set("jscmd", "data");
    return `/api/books?${urlParams.toString()}`;
  }, [bookId]);

  const { data, isLoading, error } = useFetch<BookAPIResponse>(url);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <h2>Error: {error.message}</h2>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.container}>
        <div className={styles.notFoundContainer}>
          <h2>Sorry, we don&apos;t have this book :(</h2>
        </div>
      </div>
    );
  }

  const book = data[`OLID:${bookId}`];

  if (!book) {
    return (
      <div className={styles.container}>
        <div className={styles.notFoundContainer}>
          <h2>Book not found</h2>
        </div>
      </div>
    );
  }

  const cover = book.cover?.large || "/placeholder.png";

  return (
    <div className={styles.container}>
      <div className={styles.bookDetails}>
        {/* Cover Section */}
        <div className={styles.coverSection}>
          <Image
            src={cover}
            alt={book.title}
            width={300}
            height={450}
            unoptimized={true}
            className={styles.coverImage}
          />
        </div>

        {/* Information Section */}
        <div className={styles.infoSection}>
          <h1 className={styles.bookTitle}>{book.title}</h1>

          <div className={styles.detailsGrid}>
            {book.authors && book.authors.length > 0 && (
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Authors:</span>
                <span className={styles.detailValue}>
                  {book.authors.map((author) => author.name).join(", ")}
                </span>
              </div>
            )}

            {book.number_of_pages && (
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Pages:</span>
                <span className={styles.detailValue}>
                  {book.number_of_pages}
                </span>
              </div>
            )}

            {book.publishers && book.publishers.length > 0 && (
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Publisher:</span>
                <span className={styles.detailValue}>
                  {book.publishers
                    .map((publisher) => publisher.name)
                    .join(", ")}
                </span>
              </div>
            )}

            {book.publish_date && (
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Publish date:</span>
                <span className={styles.detailValue}>{book.publish_date}</span>
              </div>
            )}

            {book.subjects && book.subjects.length > 0 && (
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Subjects:</span>
                <div className={styles.tagsList}>
                  {book.subjects.map((subject, index) => (
                    <span key={index} className={styles.tag}>
                      {subject.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {book.subject_people && book.subject_people.length > 0 && (
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Persons:</span>
                <div className={styles.tagsList}>
                  {book.subject_people.map((person, index) => (
                    <span key={index} className={styles.tag}>
                      {person.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {book.subject_places && book.subject_places.length > 0 && (
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Places:</span>
                <div className={styles.tagsList}>
                  {book.subject_places.map((place, index) => (
                    <span key={index} className={styles.tag}>
                      {place.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ISBN Section */}
          {(book.identifiers?.isbn_10?.[0] ||
            book.identifiers?.isbn_13?.[0]) && (
            <div className={styles.isbnSection}>
              {book.identifiers?.isbn_10?.[0] && (
                <div className={styles.isbnItem}>
                  <strong>ISBN 10</strong>
                  <span>{book.identifiers.isbn_10[0]}</span>
                </div>
              )}
              {book.identifiers?.isbn_13?.[0] && (
                <div className={styles.isbnItem}>
                  <strong>ISBN 13</strong>
                  <span>{book.identifiers.isbn_13[0]}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

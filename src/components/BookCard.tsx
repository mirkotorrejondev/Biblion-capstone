import { BookSummary } from "@/types/response/SearchAPIResponse";
import Image from "next/image";
import Link from "next/link";
import styles from "./BookCard.module.css";

export default function BookCard({
  bookInformation,
}: {
  bookInformation: BookSummary;
}) {
  let urlImage = "/placeholder.png";
  let bookOLID = bookInformation.edition_key[0];

  if (bookInformation.cover_edition_key) {
    bookOLID = bookInformation.cover_edition_key;
  }

  if (bookInformation.cover_i) {
    urlImage = `https://covers.openlibrary.org/b/id/${bookInformation.cover_i}-M.jpg`;
  }

  return (
    <article className={styles.card}>
      <Image
        src={urlImage}
        alt={bookInformation.title}
        width={180}
        height={277}
        unoptimized={true}
      />
      <div className={styles.information}>
        <h2>
          <Link href={`/book/${bookOLID}`}>{bookInformation.title}</Link>
        </h2>
        <p>Authors: {bookInformation.author_name?.join(", ")}</p>
        <p>Publish year: {bookInformation.first_publish_year}</p>
      </div>
    </article>
  );
}

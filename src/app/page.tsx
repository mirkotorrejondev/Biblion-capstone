import styles from "./page.module.css";
import BasicSearchForm from "@/components/BasicSearchForm";

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Biblion</h1>
        <p className={styles.heroDescription}>
          This is the official library of [University Name]. You can find
          information about all the books available in the university&apos;s
          collection. Through this platform, you can search for books and see if
          they are available for loan. If they are not, you can add them to a
          wish list, which will allow you to receive notifications when a book
          you&apos;re interested in becomes available for loan again.
        </p>
        <BasicSearchForm></BasicSearchForm>
      </section>
    </div>
  );
}

import AdvancedSearchForm from "@/components/AdvancedSearchForm";
import BooksDisplayer from "@/components/BooksDisplayer";
import styles from "./page.module.css";

export default function Search() {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>Advanced search</h1>
        <AdvancedSearchForm></AdvancedSearchForm>
      </div>
      <BooksDisplayer></BooksDisplayer>
    </div>
  );
}

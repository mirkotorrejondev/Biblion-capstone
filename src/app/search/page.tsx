import AdvancedSearchForm from "@/components/AdvancedSearchForm";
import BooksDisplayer from "@/components/BooksDisplayer";
import styles from "./page.module.css";
import { Suspense } from "react";

export default function Search() {
  return (
    <div className={styles.container}>
      <Suspense fallback={<div>Cargando...</div>}>
        <div>
        <h1 className={styles.title}>Advanced search</h1>
        <AdvancedSearchForm></AdvancedSearchForm>
      </div>
      <BooksDisplayer></BooksDisplayer>
      </Suspense>
    </div>
  );
}

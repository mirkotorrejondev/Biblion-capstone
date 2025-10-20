"use client";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import styles from "./BasicSearchForm.module.css";

export default function BasicSearchForm() {
  const search = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentSearchParam = search.current?.value || "";
    router.push(`/search?q=${encodeURIComponent(currentSearchParam)}`);
  };

  return (
    <form onSubmit={handleSearch} className={styles.searchBox}>
      <input
        ref={search}
        type="search"
        placeholder="Search..."
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>
        <Search color="#fff" size={20} />
      </button>
    </form>
  );
}

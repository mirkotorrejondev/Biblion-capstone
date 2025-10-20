"use client";
import useFetch from "@/lib/hooks/useFetch";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { SearchAPIResponse } from "@/types/response/SearchAPIResponse";
import BookCard from "./BookCard";
import styles from "./BooksDisplayer.module.css";

export default function BooksDisplayer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(() => {
    const pageParam = searchParams.get("page");
    return pageParam ? Number(pageParam) : 1;
  });

  const [limit, setLimit] = useState(() => {
    const limitParam = searchParams.get("limit");
    return limitParam ? Number(limitParam) : 10;
  });

  const [sort, setSort] = useState(() => {
    return searchParams.get("sort") || "";
  });

  const api = "/api/search";

  useEffect(() => {
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");
    const sortParam = searchParams.get("sort");

    setPage(pageParam ? Number(pageParam) : 1);
    setLimit(limitParam ? Number(limitParam) : 10);
    setSort(sortParam || "");
  }, [searchParams]);

  const buildUrl = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    params.set("limit", limit.toString());
    if (sort) {
      params.set("sort", sort);
    }

    return api + "?" + params.toString();
  }, [searchParams, page, limit, sort, api]);

  useEffect(() => {
    setUrl(buildUrl());
  }, [buildUrl]);

  const [url, setUrl] = useState(buildUrl());

  useEffect(() => {
    setUrl(buildUrl());
  }, [buildUrl]);

  const { data, isLoading, error } = useFetch<SearchAPIResponse>(url);

  const numberOfPages = data ? Math.ceil(data.numFound / limit) : 0;

  const updateURL = (newPage: number, newLimit: number, newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newPage > 1) {
      params.set("page", newPage.toString());
    } else {
      params.delete("page");
    }

    if (newLimit !== 10) {
      params.set("limit", newLimit.toString());
    } else {
      params.delete("limit");
    }

    if (newSort) {
      params.set("sort", newSort);
    } else {
      params.delete("sort");
    }

    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= numberOfPages) {
      setPage(newPage);
      updateURL(newPage, limit, sort);
    }
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(e.target.value);
    setLimit(newLimit);
    setPage(1);
    updateURL(1, newLimit, sort);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    setSort(newSort);
    setPage(1);
    updateURL(1, limit, newSort);
  };

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

  if (!data || !data.docs) {
    return (
      <div className={styles.container}>
        <div className={styles.noResultsContainer}>
          <h2>Sorry, your search didn&apos;t match any documents.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.controlsSection}>
        <div className={styles.controlGroup}>
          <label>
            Per page:
            <select
              value={limit}
              onChange={handleLimitChange}
              className={styles.controlSelect}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </label>
        </div>

        <div className={styles.controlGroup}>
          <label>
            Sort:
            <select
              value={sort}
              onChange={handleSortChange}
              className={styles.controlSelect}
            >
              <option value="">Default</option>
              <option value="title">Title</option>
              <option value="new">Most recently published</option>
              <option value="old">Oldest published</option>
              <option value="rating">Rating</option>
            </select>
          </label>
        </div>
      </div>

      <div className={styles.result}>
        <div className={styles.resultHeader}>
          <h2>Total results: {data.numFound}</h2>
        </div>
        <div className={styles.booksContainer}>
          {data.docs.map((book, index) => (
            <BookCard key={index} bookInformation={book} />
          ))}
        </div>
      </div>

      <div className={styles.paginationContainer}>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={styles.paginationButton}
        >
          Previous
        </button>

        <select
          value={page}
          onChange={(e) => handlePageChange(Number(e.target.value))}
          className={styles.pageSelector}
        >
          {Array.from({ length: numberOfPages }).map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Page {i + 1}
            </option>
          ))}
        </select>

        <span className={styles.pageInfo}>de {numberOfPages}</span>

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === numberOfPages}
          className={styles.paginationButton}
        >
          Next
        </button>
      </div>
    </div>
  );
}

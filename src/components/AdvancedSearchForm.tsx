"use client";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./AdvancedSearchForm.module.css";

interface Field {
  id: number;
  type: string;
  value: string;
}

type ParameterKey =
  | "q"
  | "title"
  | "author"
  | "isbn"
  | "place"
  | "person"
  | "publisher"
  | "subject";

export default function AdvancedSearchForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const typeOfParameters: [ParameterKey, string][] = [
    ["q", "Anywhere"],
    ["title", "Title"],
    ["author", "Author"],
    ["isbn", "ISBN"],
    ["place", "Places"],
    ["person", "Person"],
    ["publisher", "Publisher"],
    ["subject", "Subject"],
  ];

  const parameters: Record<ParameterKey, string> = {
    q: "Anywhere",
    title: "Title",
    author: "Author",
    isbn: "ISBN",
    place: "Places",
    person: "Person",
    publisher: "Publisher",
    subject: "Subject",
  };

  const [fields, setFields] = useState<Field[]>([
    { id: Date.now(), type: "q", value: "" },
  ]);

  useEffect(() => {
    const loadFields: Field[] = [];
    searchParams.forEach((value, key) => {
      if (key !== "page" && key !== "limit" && key in parameters) {
        loadFields.push({
          id: Date.now() + Math.random(),
          type: key,
          value: value,
        });
      }
    });

    if (loadFields.length > 0) {
      setFields(loadFields);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const addSearchField = () => {
    const newField: Field = {
      id: Date.now() + Math.random(),
      type: "q",
      value: "",
    };
    setFields((prev) => [...prev, newField]);
  };

  const removeSearchField = (id: number) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  };

  const handleTypeChange = (id: number, newType: string) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, type: newType } : field,
      ),
    );
  };

  const handleValueChange = (id: number, newValue: string) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, value: newValue } : field,
      ),
    );
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchParams = fields
      .map((field) => ({
        type: field.type,
        query: field.value.trim(),
      }))
      .filter((param) => param.query);

    const urlParams = new URLSearchParams();
    searchParams.forEach((param) => {
      if (urlParams.has(param.type)) {
        const previousValue = urlParams.get(param.type);
        urlParams.set(param.type, `${previousValue} AND ${param.query}`);
      } else {
        urlParams.set(param.type, param.query);
      }
    });

    if (urlParams.toString()) {
      router.push(`/search?${urlParams.toString()}`);
    }
  };

  return (
    <div className={styles.advancedSearchContainer}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <div className={styles.fieldsContainer}>
          {fields.map((field, index) => (
            <div key={field.id} className={styles.searchField}>
              <div className={styles.fielNumber}>{index + 1}</div>
              <select
                value={field.type}
                onChange={(e) => handleTypeChange(field.id, e.target.value)}
                className={styles.fieldSelect}
              >
                {typeOfParameters.map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
              <input
                type="search"
                value={field.value}
                onChange={(e) => handleValueChange(field.id, e.target.value)}
                placeholder="Enter search term..."
                className={styles.fieldInput}
              />
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSearchField(field.id)}
                  className={styles.deleteBtn}
                >
                  <X size={20} />
                </button>
              )}
            </div>
          ))}
        </div>
        <div className={styles.actionButtons}>
          <button
            type="button"
            onClick={addSearchField}
            className={styles.addFieldBtn}
          >
            Add search field
          </button>
          <button type="submit" className={styles.searchBtn}>
            <Search color="#fff"></Search> Search
          </button>
        </div>
      </form>
    </div>
  );
}

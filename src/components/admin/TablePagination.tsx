"use client";
import { useState } from "react";
import styles from "./admin.module.css";

/** Pages a complete report already returned by the server; exports keep all rows. */
export function useTablePagination<T>(rows: T[], resetKey = "") {
  const [selection, setSelection] = useState({ key: resetKey, page: 0, size: 10 });
  // Persist every filter transition so returning to a prior range starts at page one.
  if (selection.key !== resetKey) {
    setSelection({ ...selection, key: resetKey, page: 0 });
  }
  const pages = Math.max(1, Math.ceil(rows.length / selection.size));
  const page = selection.key === resetKey ? Math.min(selection.page, pages - 1) : 0;
  const offset = page * selection.size;
  return {
    rows: rows.slice(offset, offset + selection.size),
    total: rows.length,
    page,
    pages,
    size: selection.size,
    start: rows.length ? offset + 1 : 0,
    end: Math.min(offset + selection.size, rows.length),
    changePage: (next: number) => setSelection({
      key: resetKey,
      page: Math.max(0, Math.min(next, pages - 1)),
      size: selection.size,
    }),
    changeSize: (size: number) => setSelection({ key: resetKey, page: 0, size }),
  };
}

type Pager = Omit<ReturnType<typeof useTablePagination>, "rows">;
export default function TablePagination({ label, pager }: {
  label: string;
  pager: Pager;
}) {
  return (
    <nav className={styles.pagination} aria-label={`${label} pagination`}>
      <span aria-live="polite">
        {pager.start}–{pager.end} of {pager.total.toLocaleString()}
      </span>
      <label>
        Rows per page
        <select
          aria-label={`${label} rows per page`}
          value={pager.size}
          onChange={(e) => pager.changeSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </label>
      <div>
        <button
          type="button"
          disabled={pager.page === 0}
          onClick={() => pager.changePage(pager.page - 1)}
        >
          Previous
        </button>
        <span>Page {pager.page + 1} of {pager.pages}</span>
        <button
          type="button"
          disabled={pager.page + 1 >= pager.pages}
          onClick={() => pager.changePage(pager.page + 1)}
        >
          Next
        </button>
      </div>
    </nav>
  );
}

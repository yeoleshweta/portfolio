import type { ReactNode } from "react";
import styles from "./DataTable.module.css";

/**
 * A bordered data table. On phones each row stacks into a labelled card, so
 * every data cell needs a `data-label` (usually its column head) and the first
 * cell of each row should be a `<th scope="row">`. The caption is read by
 * screen readers only.
 */
export default function DataTable({
  caption,
  heads,
  className,
  children,
}: {
  caption: string;
  heads: string[];
  /** Adds a page's own class, for column widths and row states. */
  className?: string;
  /** The `<tr>` rows. */
  children: ReactNode;
}) {
  return (
    <table className={className ? `${styles.table} ${className}` : styles.table}>
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr>
          {heads.map((head) => (
            <th key={head} scope="col">
              {head}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

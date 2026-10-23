import React from "react";

/** Plain text with inline bold runs: strings and `{ strong }` objects. */
export type Rich = (string | { strong: string })[];

export function RichText({ parts }: { parts: Rich }) {
  return (
    <>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          <React.Fragment key={i}>{part}</React.Fragment>
        ) : (
          <strong key={i}>{part.strong}</strong>
        ),
      )}
    </>
  );
}

"use client";

type ParagraphsProps = {
  text: string | undefined;
};

export function Paragraphs({text}: ParagraphsProps) {
  if (!text) {
    return null;
  }

  const paragraphs = text.split("\n").map((line, index) =>
    line.trim() === "" ? (
      <p key={index}>&nbsp;</p> // Render an empty paragraph for blank lines
    ) : (
      <p key={index} className="text-muted-foreground">
        {line.trim()}
      </p>
    )
  );

  return <div>{paragraphs}</div>;
}
import { CopyButton } from "@/components/CopyButton";

// [BRACKETS] are the parts a student fills in.
function Marked({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[A-Z][^\]]*\])/g).map((piece, i) =>
        /^\[[A-Z]/.test(piece) ? <mark key={i}>{piece}</mark> : <span key={i}>{piece}</span>,
      )}
    </>
  );
}

// Prompts and commands are the same thing to a student: text to copy.
export function Prompt({ label, text }: { label?: string; text: string }) {
  return (
    <figure className="prompt">
      <figcaption>
        <span>{label}</span>
        <CopyButton text={text} />
      </figcaption>
      <pre>
        <Marked text={text} />
      </pre>
    </figure>
  );
}

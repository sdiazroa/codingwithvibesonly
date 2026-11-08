import { CopyButton } from "@/components/CopyButton";
import type { Mode } from "@/lib/types";

// [BRACKETS] are the parts a student fills in, so they stand out.
function Marked({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[A-Z][^\]]*\])/g).map((piece, i) =>
        /^\[[A-Z]/.test(piece) ? <mark key={i}>{piece}</mark> : <span key={i}>{piece}</span>,
      )}
    </>
  );
}

export function Prompt({ title, mode, saves, text }: { title: string; mode?: Mode; saves?: string; text: string }) {
  return (
    <figure className="prompt">
      <figcaption className="prompt-head">
        <div className="prompt-title">
          <span className="prompt-name">{title}</span>
          <span className="prompt-meta">
            {mode ? <span className="chip">{mode} mode</span> : null}
            {saves ? <span className="chip chip-quiet">Saves {saves}</span> : null}
          </span>
        </div>
        <CopyButton text={text} label="Copy prompt" />
      </figcaption>
      <pre className="prompt-text">
        <Marked text={text} />
      </pre>
    </figure>
  );
}

export function Command({ label, text }: { label: string; text: string }) {
  return (
    <figure className="prompt prompt-command">
      <figcaption className="prompt-head">
        <span className="prompt-name">{label}</span>
        <CopyButton text={text} />
      </figcaption>
      <pre className="prompt-text">{text}</pre>
    </figure>
  );
}

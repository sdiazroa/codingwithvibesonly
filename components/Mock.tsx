import type { ReactNode } from "react";
import type { MockName } from "@/lib/types";

// Simple drawings of where to click. The one thing to click is always marked the same way.
const Hit = ({ on, children }: { on?: boolean; children: ReactNode }) => <span className={on ? "hit" : undefined}>{children}</span>;

function Sidebar({ hit }: { hit?: "code" | "new" }) {
  return (
    <div className="m-side">
      <Hit on={hit === "new"}>+ New</Hit>
      <span>Chat</span>
      <span>Cowork</span>
      <Hit on={hit === "code"}>
        <b>Code</b>
      </Hit>
    </div>
  );
}

function PromptBox({ hit, menu, folder = "my-first-app", mode = "Plan" }: { hit?: "plus" | "env" | "folder" | "mode"; menu?: ReactNode; folder?: string; mode?: string }) {
  return (
    <div className="m-prompt">
      <div className="m-input">
        <Hit on={hit === "plus"}>+</Hit>
        <span className="m-quiet">Type your task</span>
      </div>
      <div className="m-row">
        <Hit on={hit === "env"}>Local ▾</Hit>
        <Hit on={hit === "folder"}>{folder} ▾</Hit>
        <Hit on={hit === "mode"}>{mode} ▾</Hit>
      </div>
      {menu ? <div className="m-menu">{menu}</div> : null}
    </div>
  );
}

function ClaudeWindow({ side, title, children }: { side?: "code" | "new" | "plain"; title?: ReactNode; children: ReactNode }) {
  return (
    <div className="m-window">
      <div className="m-bar">
        <i />
        <i />
        <i />
        {title ? <div className="m-title">{title}</div> : null}
      </div>
      <div className="m-body">
        {side ? <Sidebar hit={side === "plain" ? undefined : side} /> : null}
        <div className="m-main">{children}</div>
      </div>
    </div>
  );
}

function Files({ place, bar, menu }: { place: string; bar: ReactNode; menu: ReactNode }) {
  return (
    <div className="m-window">
      <div className="m-bar">{bar}</div>
      <div className="m-body">
        <div className="m-side">
          {["Desktop", "Documents", "Downloads"].map((name) => (name === place ? <b key={name}>{name}</b> : <span key={name}>{name}</span>))}
        </div>
        <div className="m-main m-files">
          <div className="m-menu">{menu}</div>
        </div>
      </div>
    </div>
  );
}

const content: Record<MockName, { label: string; view: ReactNode }> = {
  "install-mac": {
    label: "An installer window. Drag the Claude icon onto the Applications folder.",
    view: (
      <div className="m-window">
        <div className="m-bar">
          <i />
          <i />
          <i />
        </div>
        <div className="m-install">
          <span className="m-icon">Claude</span>
          <span className="m-arrow" aria-hidden="true">
            →
          </span>
          <span className="m-icon hit">Applications</span>
        </div>
      </div>
    ),
  },
  "install-windows": {
    label: "The Downloads folder. Double-click the Claude setup file.",
    view: (
      <Files
        place="Downloads"
        bar={<span className="m-title">File Explorer</span>}
        menu={<span className="hit">Claude Setup</span>}
      />
    ),
  },
  "folder-mac": {
    label: "A Finder window on Documents, with New Folder marked in the right-click menu.",
    view: (
      <Files
        place="Documents"
        bar={<span className="m-title">Finder</span>}
        menu={
          <>
            <span className="hit">New Folder</span>
            <span className="m-quiet">Get Info</span>
          </>
        }
      />
    ),
  },
  "folder-windows": {
    label: "File Explorer on Documents, with New then Folder marked in the right-click menu.",
    view: (
      <Files
        place="Documents"
        bar={<span className="m-title">File Explorer</span>}
        menu={
          <>
            <span>New ›</span>
            <span className="hit">Folder</span>
          </>
        }
      />
    ),
  },
  "code-tab": {
    label: "The Claude app, with the Code tab marked in the sidebar.",
    view: (
      <ClaudeWindow side="code">
        <PromptBox folder="Choose folder" mode="Manual" />
      </ClaudeWindow>
    ),
  },
  local: {
    label: "The row under the prompt box. The first menu is open, with Local marked.",
    view: (
      <ClaudeWindow>
        <PromptBox hit="env" folder="Choose folder" mode="Manual" menu={<span className="hit">Local</span>} />
      </ClaudeWindow>
    ),
  },
  "open-folder": {
    label: "The row under the prompt box. The folder menu is open, with Open folder marked.",
    view: (
      <ClaudeWindow>
        <PromptBox hit="folder" folder="Choose folder" mode="Manual" menu={<span className="hit">Open folder…</span>} />
      </ClaudeWindow>
    ),
  },
  mode: {
    label: "The row under the prompt box. The mode menu is open, with Plan marked.",
    view: (
      <ClaudeWindow>
        <PromptBox
          hit="mode"
          mode="Manual"
          menu={
            <>
              <span>Manual</span>
              <span>Accept edits</span>
              <span className="hit">Plan</span>
            </>
          }
        />
      </ClaudeWindow>
    ),
  },
  "new-session": {
    label: "The Claude app, with the New button marked at the top of the sidebar.",
    view: (
      <ClaudeWindow side="new">
        <PromptBox />
      </ClaudeWindow>
    ),
  },
  "file-link": {
    label: "A message from Claude, with the file name docs/product.md marked.",
    view: (
      <ClaudeWindow>
        <p className="m-chat">
          I saved the summary to <span className="hit m-link">docs/product.md</span>
        </p>
      </ClaudeWindow>
    ),
  },
  attach: {
    label: "The prompt box, with the plus button marked.",
    view: (
      <ClaudeWindow>
        <PromptBox hit="plus" menu={<span className="hit">Add files or photos</span>} />
      </ClaudeWindow>
    ),
  },
  browser: {
    label: "The top of a session, with the Browser button marked.",
    view: (
      <ClaudeWindow
        title={
          <>
            <span>Terminal</span>
            <span>Changes</span>
            <span className="hit">Browser</span>
            <span>Files</span>
          </>
        }
      >
        <p className="m-chat">Your app is running. Check the Save button on the main screen.</p>
      </ClaudeWindow>
    ),
  },
};

export function Mock({ show }: { show: MockName }) {
  const { label, view } = content[show];
  return (
    <figure className="mock" role="img" aria-label={label}>
      {view}
    </figure>
  );
}

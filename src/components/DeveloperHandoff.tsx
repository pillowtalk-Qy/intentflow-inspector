import { Clipboard, FileCode2, TerminalSquare } from "lucide-react";
import type { IntentRequest } from "../types";

type Props = {
  request: IntentRequest;
};

export function DeveloperHandoff({ request }: Props) {
  const requestJson = JSON.stringify(request, null, 2);
  const curlSnippet = [
    "curl -X POST https://order.li.fi/quote/request \\",
    "  -H 'Content-Type: application/json' \\",
    `  -d '${JSON.stringify(request)}'`
  ].join("\n");
  const tsSnippet = [
    "const response = await fetch('https://order.li.fi/quote/request', {",
    "  method: 'POST',",
    "  headers: { 'Content-Type': 'application/json' },",
    `  body: JSON.stringify(${requestJson.replace(/\n/g, "\n  ")})`,
    "});",
    "",
    "const { quotes } = await response.json();",
    "const bestQuote = quotes[0];"
  ].join("\n");

  return (
    <section className="panel handoff-panel" aria-labelledby="handoff-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Builder handoff</p>
          <h2 id="handoff-title">Copy the integration shape</h2>
        </div>
        <FileCode2 aria-hidden="true" />
      </div>

      <div className="handoff-grid">
        <SnippetBlock title="curl" icon={<TerminalSquare size={18} aria-hidden="true" />} code={curlSnippet} />
        <SnippetBlock title="TypeScript" icon={<FileCode2 size={18} aria-hidden="true" />} code={tsSnippet} />
      </div>
    </section>
  );
}

type SnippetProps = {
  title: string;
  icon: React.ReactNode;
  code: string;
};

function SnippetBlock({ title, icon, code }: SnippetProps) {
  async function copySnippet() {
    await navigator.clipboard.writeText(code);
  }

  return (
    <article className="snippet-card">
      <div className="snippet-heading">
        <div>
          {icon}
          <strong>{title}</strong>
        </div>
        <button type="button" className="icon-action" onClick={copySnippet} aria-label={`Copy ${title} snippet`}>
          <Clipboard size={16} aria-hidden="true" />
        </button>
      </div>
      <pre className="snippet-code">{code}</pre>
    </article>
  );
}

import { Clipboard, Code2 } from "lucide-react";
import type { IntentRequest } from "../types";

type Props = {
  request: IntentRequest;
};

export function RequestPreview({ request }: Props) {
  const json = JSON.stringify(request, null, 2);

  async function copyRequest() {
    await navigator.clipboard.writeText(json);
  }

  return (
    <section className="panel code-panel" aria-labelledby="request-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Step 2</p>
          <h2 id="request-title">Quote request</h2>
        </div>
        <Code2 aria-hidden="true" />
      </div>

      <div className="field-notes">
        <span>Uses EIP-7930 interoperable addresses.</span>
        <span>Best for showing outcome-first UX.</span>
        <span>Escrow type: oif-escrow-v0.</span>
      </div>

      <pre className="code-block" aria-label="LI.FI Intents quote request body">
        {json}
      </pre>

      <button className="secondary-action" type="button" onClick={copyRequest}>
        <Clipboard size={16} aria-hidden="true" />
        Copy JSON
      </button>
    </section>
  );
}

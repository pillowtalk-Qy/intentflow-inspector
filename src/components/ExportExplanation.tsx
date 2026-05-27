import { Clipboard, FileText, Megaphone } from "lucide-react";
import type { DemoScenario, QuoteResult } from "../types";
import { quoteSummary } from "../data/mockQuote";
import { compactAddress } from "../utils/interoperableAddress";

type Props = {
  scenario: DemoScenario;
  quoteResult: QuoteResult | null;
};

export function ExportExplanation({ scenario, quoteResult }: Props) {
  const quote = quoteResult?.quotes[0] ?? null;
  const summary = quote ? quoteSummary(quote) : null;
  const explanation = quote && summary && quoteResult ? buildExplanation(scenario, quoteResult, summary.inputText, summary.outputText) : "";

  async function copyExplanation() {
    if (explanation) {
      await navigator.clipboard.writeText(explanation);
    }
  }

  return (
    <section className="panel export-panel" aria-labelledby="export-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Share output</p>
          <h2 id="export-title">Export a builder explanation</h2>
        </div>
        <Megaphone aria-hidden="true" />
      </div>

      {quote && explanation ? (
        <>
          <div className="export-ready">
            <FileText size={18} aria-hidden="true" />
            <span>Ready for an X thread, README note, or walkthrough voiceover.</span>
          </div>
          <pre className="export-copy">{explanation}</pre>
          <button type="button" className="secondary-action" onClick={copyExplanation}>
            <Clipboard size={16} aria-hidden="true" />
            Copy explanation
          </button>
        </>
      ) : (
        <div className="empty-state compact-empty">
          <FileText aria-hidden="true" />
          <p>Request a quote first. The export will summarize the route, quote id, validity, output preview, and solver lesson.</p>
        </div>
      )}
    </section>
  );
}

function buildExplanation(
  scenario: DemoScenario,
  quoteResult: QuoteResult,
  inputText: string,
  outputText: string
) {
  const quote = quoteResult.quotes[0];
  const solver = quote.metadata.exclusiveFor ? compactAddress(quote.metadata.exclusiveFor) : "no exclusive solver address";
  const source = quoteResult.source === "live" ? "a live LI.FI Intents quote" : "fallback demo quote data";

  return [
    `IntentFlow Inspector traced ${source} for ${scenario.fromChain.name} ${scenario.fromToken.symbol} -> ${scenario.toChain.name} ${scenario.toToken.symbol}.`,
    `The intent is ${scenario.swapType}: ${inputText} becomes ${outputText}, with quoteId ${quote.quoteId}.`,
    `The quote expires at ${new Date(quote.validUntil * 1000).toLocaleTimeString()} and uses failureHandling=${quote.failureHandling}.`,
    `Solver signal: ${solver}. The builder lesson is to treat quoteId, validUntil, preview.inputs, preview.outputs, and failureHandling as product-facing integration fields, not background JSON.`
  ].join("\n\n");
}

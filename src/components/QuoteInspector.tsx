import { AlertCircle, CheckCircle2, Info, Loader2, RadioTower, ShieldCheck } from "lucide-react";
import type { QuoteResult } from "../types";
import { quoteSummary } from "../data/mockQuote";
import { compactAddress } from "../utils/interoperableAddress";

type Props = {
  quoteResult: QuoteResult | null;
  isLoading: boolean;
  onRequestQuote: () => void;
};

export function QuoteInspector({ quoteResult, isLoading, onRequestQuote }: Props) {
  const quote = quoteResult?.quotes[0] ?? null;
  const summary = quote ? quoteSummary(quote) : null;
  const quoteSource = quoteResult?.source;

  return (
    <section className="panel quote-panel" aria-labelledby="quote-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Step 3</p>
          <h2 id="quote-title">Inspect the best quote</h2>
        </div>
        <RadioTower aria-hidden="true" />
      </div>

      <button className="primary-action" type="button" onClick={onRequestQuote} disabled={isLoading}>
        {isLoading ? <Loader2 className="spin" size={18} aria-hidden="true" /> : <ShieldCheck size={18} aria-hidden="true" />}
        {isLoading ? "Requesting quote" : "Request LI.FI quote"}
      </button>

      {quoteResult?.source === "fallback" && (
        <div className="notice">
          <AlertCircle size={18} aria-hidden="true" />
          <span>Live quote unavailable. Showing demo fallback data so the flow stays reviewable.</span>
        </div>
      )}

      {quoteResult?.message && <p className="muted">Reason: {quoteResult.message}</p>}

      {quote && summary ? (
        <>
          <div className="quote-status-row">
            <span className={quoteSource === "live" ? "source-badge live" : "source-badge fallback"}>
              {quoteSource === "live" ? "Live LI.FI response" : "Demo fallback response"}
            </span>
            <span>Best quote is displayed from index 0.</span>
          </div>

          <div className="quote-grid">
            <div className="quote-metric featured">
              <span>Best quote</span>
              <strong>{summary.inputText} → {summary.outputText}</strong>
            </div>
            <div className="quote-metric">
              <span>quoteId</span>
              <strong>{quote.quoteId}</strong>
            </div>
            <div className="quote-metric">
              <span>validUntil</span>
              <strong>{new Date(quote.validUntil * 1000).toLocaleTimeString()}</strong>
            </div>
            <div className="quote-metric">
              <span>exclusiveFor</span>
              <strong>{quote.metadata.exclusiveFor ? compactAddress(quote.metadata.exclusiveFor) : "None"}</strong>
            </div>
            <div className="quote-metric">
              <span>Partial fill</span>
              <strong>{quote.partialFill ? "Allowed" : "Disabled"}</strong>
            </div>
            <div className="quote-metric">
              <span>Failure handling</span>
              <strong>{quote.failureHandling}</strong>
            </div>
          </div>

          <div className="field-explainer">
            <Info size={18} aria-hidden="true" />
            <ul>
              <li><strong>quoteId</strong> is the handle you keep if the app later submits the order.</li>
              <li><strong>validUntil</strong> tells the UI when to refresh before a user signs stale terms.</li>
              <li><strong>exclusiveFor</strong> points to a solver-specific quote when the response is exclusive.</li>
            </ul>
          </div>
        </>
      ) : (
        <div className="empty-state">
          <CheckCircle2 aria-hidden="true" />
          <p>Request a quote to inspect the response fields LI.FI builders need to understand.</p>
        </div>
      )}
    </section>
  );
}

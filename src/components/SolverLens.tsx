import { Boxes, CheckCircle2, Gauge, TimerReset } from "lucide-react";
import type { DemoScenario, QuoteResult } from "../types";
import { createSolverQuotes } from "../data/mockQuote";
import { compactAddress } from "../utils/interoperableAddress";
import { formatQuoteExpiry } from "../utils/time";

type Props = {
  scenario: DemoScenario;
  quoteResult: QuoteResult | null;
};

export function SolverLens({ scenario, quoteResult }: Props) {
  const solvers = createSolverQuotes(scenario);
  const quote = quoteResult?.quotes[0] ?? null;
  const solverSignal = quote?.metadata.exclusiveFor ? compactAddress(quote.metadata.exclusiveFor) : "Request a quote to inspect";

  return (
    <section className="panel solver-panel" aria-labelledby="solver-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Step 5</p>
          <h2 id="solver-title">Illustrative solver lens</h2>
        </div>
        <Boxes aria-hidden="true" />
      </div>

      <p className="panel-intro">
        The cards below are mock solver profiles for teaching. The live quote signal is pulled from the
        quote response when one is available.
      </p>

      <div className="live-solver-strip">
        <div>
          <span>Live quote source</span>
          <strong>{quoteResult ? (quoteResult.source === "live" ? "LI.FI order server" : "Demo fallback") : "Not requested yet"}</strong>
        </div>
        <div>
          <span>exclusiveFor</span>
          <strong>{solverSignal}</strong>
        </div>
        <div>
          <span>validUntil</span>
          <strong>{quote ? formatQuoteExpiry(quote.validUntil) : "Request a quote first"}</strong>
        </div>
      </div>

      <div className="solver-grid">
        {solvers.map((solver) => (
          <article key={solver.name} className={solver.selected ? "solver-card selected" : "solver-card"}>
            <div className="solver-card-header">
              <strong>{solver.name}</strong>
              {solver.selected && (
                <span className="selected-badge">
                  <CheckCircle2 size={14} aria-hidden="true" />
                  Selected
                </span>
              )}
            </div>
            <dl>
              <div>
                <dt>Fee</dt>
                <dd>{solver.feeBps} bps</dd>
              </div>
              <div>
                <dt>Inventory</dt>
                <dd>{solver.inventory}</dd>
              </div>
              <div>
                <dt>Max</dt>
                <dd>{solver.maxAmount.toLocaleString()} USDC</dd>
              </div>
              <div>
                <dt>ETA</dt>
                <dd>{solver.eta}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <div className="insight-strip">
        <div>
          <Gauge aria-hidden="true" />
          <span>Standing quotes make route availability predictable for integrators.</span>
        </div>
        <div>
          <TimerReset aria-hidden="true" />
          <span>Fast settlement reduces how long solver capital stays locked.</span>
        </div>
      </div>
    </section>
  );
}

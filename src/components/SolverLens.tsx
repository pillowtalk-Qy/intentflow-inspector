import { Boxes, CheckCircle2, Gauge, TimerReset } from "lucide-react";
import type { DemoScenario } from "../types";
import { createSolverQuotes } from "../data/mockQuote";

type Props = {
  scenario: DemoScenario;
};

export function SolverLens({ scenario }: Props) {
  const solvers = createSolverQuotes(scenario);

  return (
    <section className="panel solver-panel" aria-labelledby="solver-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Step 5</p>
          <h2 id="solver-title">Think like a solver</h2>
        </div>
        <Boxes aria-hidden="true" />
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

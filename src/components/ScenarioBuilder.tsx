import { ArrowRightLeft, CircleDollarSign, ReceiptText } from "lucide-react";
import type { CSSProperties } from "react";
import type { DemoScenario, SwapType } from "../types";
import { scenarios } from "../data/scenarios";

type Props = {
  scenario: DemoScenario;
  amount: string;
  swapType: SwapType;
  onScenarioChange: (scenario: DemoScenario) => void;
  onAmountChange: (amount: string) => void;
  onSwapTypeChange: (swapType: SwapType) => void;
};

export function ScenarioBuilder({
  scenario,
  amount,
  swapType,
  onScenarioChange,
  onAmountChange,
  onSwapTypeChange
}: Props) {
  return (
    <section className="panel scenario-panel" aria-labelledby="scenario-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Step 1</p>
          <h2 id="scenario-title">Build the intent</h2>
        </div>
        <ReceiptText aria-hidden="true" />
      </div>

      <div className="scenario-tabs" role="tablist" aria-label="Demo scenarios">
        {scenarios.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === scenario.id ? "tab active" : "tab"}
            onClick={() => onScenarioChange(item)}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="route-card">
        <div className="chain-pill" style={{ "--accent": scenario.fromChain.color } as CSSProperties}>
          <span>{scenario.fromChain.name}</span>
          <strong>{scenario.fromToken.symbol}</strong>
        </div>
        <ArrowRightLeft aria-hidden="true" />
        <div className="chain-pill" style={{ "--accent": scenario.toChain.color } as CSSProperties}>
          <span>{scenario.toChain.name}</span>
          <strong>{scenario.toToken.symbol}</strong>
        </div>
      </div>

      <label className="field">
        <span>Amount</span>
        <div className="amount-input">
          <CircleDollarSign size={18} aria-hidden="true" />
          <input
            value={amount}
            onChange={(event) => onAmountChange(event.target.value)}
            inputMode="decimal"
            aria-label="USDC amount"
          />
          <span>{scenario.fromToken.symbol}</span>
        </div>
      </label>

      <div className="segmented-control" aria-label="Swap type">
        <button
          type="button"
          className={swapType === "exact-input" ? "active" : ""}
          onClick={() => onSwapTypeChange("exact-input")}
        >
          Exact input
        </button>
        <button
          type="button"
          className={swapType === "exact-output" ? "active" : ""}
          onClick={() => onSwapTypeChange("exact-output")}
        >
          Exact output
        </button>
      </div>

      <p className="scenario-note">{scenario.useCase}</p>
      <p className="muted">{scenario.note}</p>
    </section>
  );
}

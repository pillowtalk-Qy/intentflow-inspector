import { BookOpen, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { buildIntentRequest, requestQuote } from "./api/lifi";
import { ArchitectureMap } from "./components/ArchitectureMap";
import { DeveloperHandoff } from "./components/DeveloperHandoff";
import { ExplainerCards } from "./components/ExplainerCards";
import { ExportExplanation } from "./components/ExportExplanation";
import { LifecycleTimeline } from "./components/LifecycleTimeline";
import { NoQuoteLab } from "./components/NoQuoteLab";
import { QuoteInspector } from "./components/QuoteInspector";
import { RequestPreview } from "./components/RequestPreview";
import { ScenarioBuilder } from "./components/ScenarioBuilder";
import { SolverLens } from "./components/SolverLens";
import { scenarios } from "./data/scenarios";
import type { DemoScenario, QuoteResult, SwapType } from "./types";

export default function App() {
  const [baseScenario, setBaseScenario] = useState<DemoScenario>(scenarios[0]);
  const [amount, setAmount] = useState(baseScenario.amount);
  const [swapType, setSwapType] = useState<SwapType>(baseScenario.swapType);
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const scenario = useMemo(
    () => ({
      ...baseScenario,
      amount,
      swapType
    }),
    [amount, baseScenario, swapType]
  );

  const intentRequest = useMemo(() => buildIntentRequest(scenario), [scenario]);

  function handleScenarioChange(nextScenario: DemoScenario) {
    setBaseScenario(nextScenario);
    setAmount(nextScenario.amount);
    setSwapType(nextScenario.swapType);
    setQuoteResult(null);
  }

  async function handleQuoteRequest() {
    setIsLoading(true);
    setQuoteResult(null);
    const result = await requestQuote(scenario);
    setQuoteResult(result);
    setIsLoading(false);
  }

  return (
    <main>
      <header className="hero">
        <div className="hero-copy">
          <div className="hero-label">
            <Sparkles size={16} aria-hidden="true" />
            LI.FI Intents developer demo
          </div>
          <h1>IntentFlow Inspector</h1>
          <p>
            Inspect a merchant invoice intent from request body to live quote, solver signal, and settlement
            lifecycle.
          </p>
        </div>
        <a className="repo-link" href="https://docs.li.fi/lifi-intents/introduction" target="_blank" rel="noreferrer">
          <BookOpen size={18} aria-hidden="true" />
          Official docs
        </a>
      </header>

      <ExplainerCards />

      <div className="workspace">
        <ScenarioBuilder
          scenario={scenario}
          amount={amount}
          swapType={swapType}
          onScenarioChange={handleScenarioChange}
          onAmountChange={(value) => {
            setAmount(value);
            setQuoteResult(null);
          }}
          onSwapTypeChange={(value) => {
            setSwapType(value);
            setQuoteResult(null);
          }}
        />
        <RequestPreview request={intentRequest} />
        <QuoteInspector quoteResult={quoteResult} isLoading={isLoading} onRequestQuote={handleQuoteRequest} />
        <ExportExplanation scenario={scenario} quoteResult={quoteResult} />
        <LifecycleTimeline />
        <SolverLens scenario={scenario} quoteResult={quoteResult} />
        <NoQuoteLab />
        <ArchitectureMap />
        <DeveloperHandoff request={intentRequest} />
      </div>
    </main>
  );
}

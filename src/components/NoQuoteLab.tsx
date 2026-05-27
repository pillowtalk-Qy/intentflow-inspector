import { AlertTriangle, Clock3, PackageSearch, RefreshCcw, RouteOff } from "lucide-react";

const cases = [
  {
    icon: RouteOff,
    title: "Route unavailable",
    symptom: "The quote endpoint returns no usable quote for the chosen chain/token pair.",
    builderMove: "Show a clear route unavailable state and offer nearby supported routes."
  },
  {
    icon: PackageSearch,
    title: "Solver inventory thin",
    symptom: "A solver may not have enough destination inventory to fill the requested amount.",
    builderMove: "Reduce the amount, switch route, or retry later instead of hiding the reason."
  },
  {
    icon: Clock3,
    title: "Quote expired",
    symptom: "The user waits past validUntil before signing or submitting an order.",
    builderMove: "Refresh the quote and never treat an expired price as reusable."
  }
];

export function NoQuoteLab() {
  return (
    <section className="panel noquote-panel" aria-labelledby="noquote-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Failure lab</p>
          <h2 id="noquote-title">Teach the no-quote path</h2>
        </div>
        <AlertTriangle aria-hidden="true" />
      </div>

      <div className="failure-grid">
        {cases.map((item) => {
          const Icon = item.icon;

          return (
            <article className="failure-card" key={item.title}>
              <Icon aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.symptom}</p>
              <strong>{item.builderMove}</strong>
            </article>
          );
        })}
      </div>

      <div className="retry-note">
        <RefreshCcw size={18} aria-hidden="true" />
        <span>Fallback data keeps the demo teachable, while the badge tells reviewers whether the result came from the live endpoint.</span>
      </div>
    </section>
  );
}

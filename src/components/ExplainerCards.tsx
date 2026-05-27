import { BookOpenCheck, Braces, Route } from "lucide-react";

const cards = [
  {
    icon: Route,
    title: "Outcome-first UX",
    text: "The buyer starts with a desired merchant outcome, not a bridge route or manual chain path."
  },
  {
    icon: Braces,
    title: "Live quote inspection",
    text: "The demo turns quoteId, validUntil, preview outputs, exclusiveFor, and failure handling into readable fields."
  },
  {
    icon: BookOpenCheck,
    title: "Submission-ready flow",
    text: "The same experience works as a repo, a walkthrough video, and a short X thread for the challenge."
  }
];

export function ExplainerCards() {
  return (
    <section className="explainer-grid" aria-label="Demo highlights">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article key={card.title} className="explainer-card">
            <Icon aria-hidden="true" />
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        );
      })}
    </section>
  );
}

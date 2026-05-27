import { BookOpenCheck, Braces, Route } from "lucide-react";

const cards = [
  {
    icon: Route,
    title: "Outcome-first UX",
    text: "Users state what should arrive. The app does not expose bridge routing as a decision."
  },
  {
    icon: Braces,
    title: "Developer-visible fields",
    text: "The demo makes quoteId, expiry, preview outputs, partial fills, and failure handling inspectable."
  },
  {
    icon: BookOpenCheck,
    title: "Builder-ready story",
    text: "The flow works as a repo, a screen recording, and a short X thread for the challenge."
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

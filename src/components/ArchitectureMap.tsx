import { ArrowRight, Boxes, CheckCircle2, Landmark, ServerCog, UserRound } from "lucide-react";

const nodes = [
  {
    icon: UserRound,
    title: "User intent",
    text: "The app asks for the outcome: what leaves, what arrives, and where."
  },
  {
    icon: ServerCog,
    title: "Order server",
    text: "LI.FI evaluates the request against current solver standing quotes."
  },
  {
    icon: Boxes,
    title: "Solver fill",
    text: "A selected solver uses inventory or liquidity to deliver on the destination chain."
  },
  {
    icon: CheckCircle2,
    title: "Verification",
    text: "Delivery is checked before the solver can settle against locked source funds."
  },
  {
    icon: Landmark,
    title: "Settlement",
    text: "The solver receives the source-side funds after the fulfillment path completes."
  }
];

export function ArchitectureMap() {
  return (
    <section className="panel architecture-panel" aria-labelledby="architecture-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Architecture</p>
          <h2 id="architecture-title">From outcome to settlement</h2>
        </div>
        <ServerCog aria-hidden="true" />
      </div>

      <div className="architecture-flow">
        {nodes.map((node, index) => {
          const Icon = node.icon;

          return (
            <div className="architecture-step" key={node.title}>
              <article>
                <Icon aria-hidden="true" />
                <h3>{node.title}</h3>
                <p>{node.text}</p>
              </article>
              {index < nodes.length - 1 && <ArrowRight className="flow-arrow" aria-hidden="true" />}
            </div>
          );
        })}
      </div>
    </section>
  );
}

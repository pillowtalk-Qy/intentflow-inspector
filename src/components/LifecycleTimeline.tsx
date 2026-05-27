import { Check, Circle, FastForward, Play, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

const lifecycle = [
  {
    label: "Intent",
    detail: "The app describes the desired outcome instead of asking the user to pick a bridge route."
  },
  {
    label: "Quote",
    detail: "LI.FI's order server matches the request against solver standing quotes."
  },
  {
    label: "Signed",
    detail: "The user signs the order and makes it available for a solver to fill."
  },
  {
    label: "Delivered",
    detail: "A solver delivers the requested output on the destination chain."
  },
  {
    label: "Settled",
    detail: "Delivery is verified and the solver receives the source-chain funds."
  }
];

export function LifecycleTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    if (activeIndex === lifecycle.length - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = window.setTimeout(() => setActiveIndex((current) => current + 1), 950);
    return () => window.clearTimeout(timer);
  }, [activeIndex, isPlaying]);

  function start() {
    if (activeIndex === lifecycle.length - 1) {
      setActiveIndex(0);
    }
    setIsPlaying(true);
  }

  function reset() {
    setIsPlaying(false);
    setActiveIndex(0);
  }

  return (
    <section className="panel timeline-panel" aria-labelledby="timeline-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Step 4</p>
          <h2 id="timeline-title">Follow the lifecycle</h2>
        </div>
        <FastForward aria-hidden="true" />
      </div>

      <div className="timeline">
        {lifecycle.map((item, index) => {
          const complete = index < activeIndex;
          const current = index === activeIndex;

          return (
            <button
              key={item.label}
              type="button"
              className={`timeline-step ${complete ? "complete" : ""} ${current ? "current" : ""}`}
              onClick={() => {
                setIsPlaying(false);
                setActiveIndex(index);
              }}
            >
              <span className="timeline-icon">
                {complete ? <Check size={16} aria-hidden="true" /> : <Circle size={16} aria-hidden="true" />}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="timeline-detail">
        <strong>{lifecycle[activeIndex].label}</strong>
        <p>{lifecycle[activeIndex].detail}</p>
      </div>

      <div className="timeline-actions">
        <button type="button" className="primary-action compact" onClick={start}>
          <Play size={16} aria-hidden="true" />
          Simulate lifecycle
        </button>
        <button type="button" className="secondary-action compact" onClick={reset}>
          <RotateCcw size={16} aria-hidden="true" />
          Reset
        </button>
      </div>
    </section>
  );
}

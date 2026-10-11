import { impact } from "@/data/site";
import Ticker from "../ui/Ticker";

export default function Impact() {
  return (
    <section className="impact" id="impact" aria-label="Impact in numbers">
      <div className="container">
        <dl className="impact-grid">
          {impact.map((stat) => (
            <div key={stat.label} className="stat">
              <dt className="stat-label">
                {stat.label}
              </dt>
              <dd className="stat-value" style={{ margin: 0 }}>
                <Ticker value={stat.value} suffix={stat.suffix} />
                <span className="sr-only">
                  {stat.value}
                  {stat.suffix}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

import { useEffect, useMemo, useState } from "react";
import { TrendingUp, CheckCircle2, AlertTriangle, CircleOff } from "lucide-react";
import PageHeader from "../components/PageHeader";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import StatusBadge from "../components/StatusBadge";
import { getCompliance } from "../services/api";

function Compliance() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getCompliance();
        setData(response && typeof response === "object" ? response : null);
      } catch (err) {
        console.error("Compliance API error:", err);
        setError("Unable to connect to the TrustLens AI backend.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const summary = useMemo(() => {
    const score = Number(data?.score ?? data?.complianceScore ?? data?.overallScore ?? 0);
    const status = data?.status || data?.complianceStatus || "Monitoring";
    const compliant = Number(data?.compliant ?? data?.compliantCount ?? 0);
    const partial = Number(data?.partial ?? data?.partialCompliance ?? data?.partialCount ?? 0);
    const nonCompliant = Number(data?.nonCompliant ?? data?.nonCompliantCount ?? 0);

    return {
      score: Number.isFinite(score) ? score : 0,
      status,
      compliant,
      partial,
      nonCompliant,
    };
  }, [data]);

  return (
    <main className="page-shell">
      <PageHeader
        eyebrow="COMPLIANCE OVERVIEW"
        title="Compliance"
        description="Monitor your organization's overall compliance posture."
      />

      {loading ? <LoadingState message="Loading compliance posture..." /> : null}
      {!loading && error ? <ErrorState message={error} /> : null}

      {!loading && !error && !data ? (
        <EmptyState title="No compliance data available" message="Compliance details will appear here once the backend responds." />
      ) : null}

      {!loading && !error && data ? (
        <>
          <section className="stats-grid compact-grid">
            <article className="stat-card">
              <div className="stat-icon"><TrendingUp size={20} /></div>
              <div>
                <p className="stat-label">Overall score</p>
                <h3>{summary.score}%</h3>
                <p className="stat-description">Current compliance posture</p>
              </div>
            </article>
            <article className="stat-card">
              <div className="stat-icon"><CheckCircle2 size={20} /></div>
              <div>
                <p className="stat-label">Compliant</p>
                <h3>{summary.compliant}</h3>
                <p className="stat-description">Fully aligned controls</p>
              </div>
            </article>
            <article className="stat-card">
              <div className="stat-icon"><AlertTriangle size={20} /></div>
              <div>
                <p className="stat-label">Partial</p>
                <h3>{summary.partial}</h3>
                <p className="stat-description">Needs follow-up</p>
              </div>
            </article>
            <article className="stat-card">
              <div className="stat-icon"><CircleOff size={20} /></div>
              <div>
                <p className="stat-label">Non-compliant</p>
                <h3>{summary.nonCompliant}</h3>
                <p className="stat-description">Immediate action</p>
              </div>
            </article>
          </section>

          <section className="dashboard-grid">
            <article className="content-card">
              <div className="card-header">
                <div>
                  <h2>Compliance posture</h2>
                  <p>Current state from the compliance service.</p>
                </div>
                <StatusBadge status={summary.status} />
              </div>

              <div className="progress-block">
                <div className="progress-track">
                  <div className="progress-value" style={{ width: `${Math.min(summary.score, 100)}%` }} />
                </div>
                <div className="progress-labels">
                  <span>Current progress</span>
                  <span>{summary.score}%</span>
                </div>
              </div>
            </article>

            <article className="content-card">
              <div className="card-header">
                <div>
                  <h2>Summary details</h2>
                  <p>Highlights returned by the API.</p>
                </div>
              </div>

              <ul className="detail-list">
                {Object.entries(data).slice(0, 6).map(([key, value]) => (
                  <li key={key}>
                    <span>{key}</span>
                    <strong>{String(value)}</strong>
                  </li>
                ))}
              </ul>
            </article>
          </section>
        </>
      ) : null}
    </main>
  );
}

export default Compliance;

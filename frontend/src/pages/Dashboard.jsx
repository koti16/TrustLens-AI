import { useEffect, useMemo, useState } from "react";
import {
  ShieldCheck,
  FileCheck2,
  TriangleAlert,
  ArrowUpRight,
  Wrench,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import { getDashboard } from "../services/api";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getDashboard();
        setDashboardData(response && typeof response === "object" ? response : null);
      } catch (err) {
        console.error("Dashboard API error:", err);
        setError("Unable to connect to the TrustLens AI backend.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const cards = useMemo(() => {
    const data = dashboardData || {};
    return [
      {
        label: "Total Documents",
        value: data.documents_count ?? data.total_documents ?? data.document_count ?? "—",
        description: "Managed documents in TrustLens",
        icon: FileCheck2,
      },
      {
        label: "Requirements",
        value: data.requirements_count ?? data.total_requirements ?? data.requirement_count ?? "—",
        description: "Tracked compliance requirements",
        icon: ShieldCheck,
      },
      {
        label: "Evidence Items",
        value: data.evidence_count ?? data.total_evidence ?? data.evidence_items ?? "—",
        description: "Evidence items available",
        icon: FileCheck2,
      },
      {
        label: "Compliance Score",
        value: `${data.score ?? data.compliance_score ?? data.overall_score ?? 0}%`,
        description: "Current posture score",
        icon: ShieldCheck,
      },
      {
        label: "Open Risks",
        value: data.open_items ?? data.open_risks_count ?? (Array.isArray(data.open_risks) ? data.open_risks.length : "—"),
        description: "Risks requiring attention",
        icon: TriangleAlert,
      },
      {
        label: "Remediation Items",
        value: data.remediation_count ?? data.remediation_items ?? (Array.isArray(data.remediation) ? data.remediation.length : "—"),
        description: "Active remediation actions",
        icon: Wrench,
      },
    ];
  }, [dashboardData]);

  const recentDocuments = useMemo(() => {
    const docs = dashboardData?.recent_documents ?? dashboardData?.documents;
    if (Array.isArray(docs)) return docs.slice(0, 4);
    return [];
  }, [dashboardData]);

  const openRisks = useMemo(() => {
    return Array.isArray(dashboardData?.open_risks) ? dashboardData.open_risks : [];
  }, [dashboardData]);

  return (
    <main className="page-shell">
      <PageHeader
        eyebrow="Trust & Compliance"
        title="Compliance Overview"
        description="Monitor compliance, evidence, risks, and remediation in one centralized dashboard."
        actions={
          <button className="primary-button">
            Analyze Document
            <ArrowUpRight size={18} />
          </button>
        }
      />

      {loading ? <LoadingState message="Loading dashboard data..." /> : null}
      {!loading && error ? <ErrorState message={error} /> : null}

      {!loading && !error && !dashboardData ? (
        <EmptyState title="No dashboard insights" message="Dashboard data will appear once the backend is available." />
      ) : null}

      {!loading && !error && dashboardData ? (
        <>
          <section className="stats-grid">
            {cards.map((card) => (
              <StatCard key={card.label} {...card} />
            ))}
          </section>

          <section className="dashboard-grid">
            <article className="content-card">
              <div className="card-header">
                <div>
                  <p className="panel-kicker">Compliance overview</p>
                  <h2>Compliance health</h2>
                </div>
                <StatusBadge status={dashboardData.status || dashboardData.compliance_status || "Monitoring"} />
              </div>

              <p className="card-description">{dashboardData.summary ?? dashboardData.message ?? "Latest compliance summary from TrustLens."}</p>

              <div className="progress-track">
                <div
                  className="progress-value"
                  style={{ width: `${Math.min(Number(dashboardData.score ?? dashboardData.compliance_score ?? 0), 100)}%` }}
                />
              </div>

              <div className="progress-labels">
                <span>Current score</span>
                <span>{dashboardData.score ?? dashboardData.compliance_score ?? 0}%</span>
              </div>
            </article>

            <article className="content-card">
              <div className="card-header">
                <div>
                  <p className="panel-kicker">Remediation progress</p>
                  <h2>Remediation</h2>
                </div>
              </div>

              <p className="card-description">{dashboardData.remediation_summary ?? "Track open items and remediation progress."}</p>

              <ul className="detail-list">
                {(dashboardData.remediation || []).slice(0, 5).map((item, index) => (
                  <li key={`${item.id ?? index}`}>{item.action ?? item.title ?? `Item ${index + 1}`}</li>
                ))}
              </ul>
            </article>
          </section>

          <section className="dashboard-grid">
            <article className="content-card">
              <div className="card-header">
                <div>
                  <p className="panel-kicker">Recent activity</p>
                  <h2>Recent documents</h2>
                </div>
              </div>

              {recentDocuments.length > 0 ? (
                <div className="list-stack">
                  {recentDocuments.map((doc, index) => (
                    <div className="list-item" key={doc.id ?? `${doc.name || doc.title || index}`}>
                      <span>{doc.name ?? doc.title ?? "Untitled document"}</span>
                      <StatusBadge status={doc.status ?? "Available"} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="card-description">No recent documents available.</p>
              )}
            </article>

            <article className="content-card">
              <div className="card-header">
                <div>
                  <p className="panel-kicker">Risk snapshot</p>
                  <h2>Open risks</h2>
                </div>
              </div>

              {openRisks.length > 0 ? (
                <div className="list-stack">
                  {openRisks.slice(0, 4).map((risk, index) => (
                    <div className="list-item" key={risk.id ?? `${risk.description || index}`}>
                      <span>{risk.description ?? risk.risk ?? `Risk ${index + 1}`}</span>
                      <StatusBadge status={risk.severity ?? "Medium"} type="severity" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="card-description">No open risk details available.</p>
              )}
            </article>
          </section>
        </>
      ) : null}
    </main>
  );
}

export default Dashboard;
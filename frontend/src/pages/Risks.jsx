import { useEffect, useMemo, useState } from "react";
import { Search, Filter, AlertTriangle } from "lucide-react";
import PageHeader from "../components/PageHeader";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import StatusBadge from "../components/StatusBadge";
import { getRisks } from "../services/api";

function Risks() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("all");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getRisks();
        setItems(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error("Risks API error:", err);
        setError("Unable to connect to the TrustLens AI backend.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const content = [item.id, item.risk, item.description, item.severity, item.category, item.status, item.owner]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesSearch = content.includes(search.toLowerCase());
      const matchesSeverity = severity === "all" || String(item.severity || "").toLowerCase() === severity;
      const matchesStatus = status === "all" || String(item.status || "").toLowerCase() === status;
      return matchesSearch && matchesSeverity && matchesStatus;
    });
  }, [items, search, severity, status]);

  return (
    <main className="page-shell">
      <PageHeader
        eyebrow="COMPLIANCE RISKS"
        title="Risks"
        description="Identify and prioritize compliance risks requiring attention."
      />

      <section className="content-card">
        <div className="card-header card-header-stack">
          <div>
            <h2>Risk register</h2>
            <p>Open issues and emerging risk conditions surfaced by the platform.</p>
          </div>

          <div className="toolbar">
            <label className="search-box">
              <Search size={16} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search risks" />
            </label>
            <label className="filter-box">
              <Filter size={16} />
              <select value={severity} onChange={(event) => setSeverity(event.target.value)}>
                <option value="all">All severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </label>
            <label className="filter-box">
              <Filter size={16} />
              <select value={status} onChange={(event) => setStatus(event.target.value)}>
                <option value="all">All statuses</option>
                <option value="open">Open</option>
                <option value="in progress">In Progress</option>
                <option value="mitigated">Mitigated</option>
              </select>
            </label>
          </div>
        </div>

        {loading ? <LoadingState message="Loading compliance risks..." /> : null}
        {!loading && error ? <ErrorState message={error} /> : null}
        {!loading && !error && filteredItems.length === 0 ? (
          <EmptyState title="No risks reported" message="The risk register is clear right now." />
        ) : null}

        {!loading && !error && filteredItems.length > 0 ? (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Risk</th>
                  <th>Severity</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Owner</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr key={item.id ?? `${item.risk || "risk"}-${index}`}>
                    <td>{item.id ?? index + 1}</td>
                    <td>{item.risk || item.description || item.title || "Untitled risk"}</td>
                    <td><StatusBadge status={item.severity || "Medium"} type="severity" /></td>
                    <td>{item.category || item.type || "N/A"}</td>
                    <td>{item.status || "Open"}</td>
                    <td>{item.owner || "Pending"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </section>
    </main>
  );
}

export default Risks;

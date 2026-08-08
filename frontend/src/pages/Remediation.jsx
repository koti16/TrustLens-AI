import { useEffect, useMemo, useState } from "react";
import { Search, Filter } from "lucide-react";
import PageHeader from "../components/PageHeader";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import StatusBadge from "../components/StatusBadge";
import { getRemediation } from "../services/api";

function Remediation() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getRemediation();
        setItems(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error("Remediation API error:", err);
        setError("Unable to connect to the TrustLens AI backend.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const content = [item.id, item.action, item.risk, item.priority, item.owner, item.status, item.dueDate]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesSearch = content.includes(search.toLowerCase());
      const matchesStatus = status === "all" || String(item.status || "").toLowerCase() === status;
      const matchesPriority = priority === "all" || String(item.priority || "").toLowerCase() === priority;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [items, search, status, priority]);

  return (
    <main className="page-shell">
      <PageHeader
        eyebrow="REMEDIATION"
        title="Remediation"
        description="Track actions required to resolve compliance gaps."
      />

      <section className="content-card">
        <div className="card-header card-header-stack">
          <div>
            <h2>Remediation queue</h2>
            <p>Issues requiring follow-up and remediation tracking.</p>
          </div>

          <div className="toolbar">
            <label className="search-box">
              <Search size={16} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search actions" />
            </label>
            <label className="filter-box">
              <Filter size={16} />
              <select value={status} onChange={(event) => setStatus(event.target.value)}>
                <option value="all">All statuses</option>
                <option value="open">Open</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </label>
            <label className="filter-box">
              <Filter size={16} />
              <select value={priority} onChange={(event) => setPriority(event.target.value)}>
                <option value="all">All priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </label>
          </div>
        </div>

        {loading ? <LoadingState message="Loading remediation items..." /> : null}
        {!loading && error ? <ErrorState message={error} /> : null}
        {!loading && !error && filteredItems.length === 0 ? (
          <EmptyState title="No remediation items" message="Every tracked issue is resolved or not yet reported." />
        ) : null}

        {!loading && !error && filteredItems.length > 0 ? (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Action</th>
                  <th>Risk</th>
                  <th>Priority</th>
                  <th>Owner</th>
                  <th>Status</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr key={item.id ?? `${item.action || "item"}-${index}`}>
                    <td>{item.id ?? index + 1}</td>
                    <td>{item.action || item.title || "Untitled action"}</td>
                    <td>{item.risk || item.issue || "N/A"}</td>
                    <td><StatusBadge status={item.priority || "Medium"} type="severity" /></td>
                    <td>{item.owner || "Pending"}</td>
                    <td><StatusBadge status={item.status || "Open"} /></td>
                    <td>{item.dueDate || item.due_date || "TBD"}</td>
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

export default Remediation;

import { useEffect, useMemo, useState } from "react";
import { Search, Filter, Database } from "lucide-react";
import PageHeader from "../components/PageHeader";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import StatusBadge from "../components/StatusBadge";
import { getEvidence } from "../services/api";

function Evidence() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getEvidence();
        setItems(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error("Evidence API error:", err);
        setError("Unable to connect to the TrustLens AI backend.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const source = [item.id, item.evidence, item.type, item.requirement, item.status, item.source]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesSearch = source.includes(search.toLowerCase());
      const matchesFilter = filter === "all" || String(item.status || "unknown").toLowerCase() === filter;
      return matchesSearch && matchesFilter;
    });
  }, [items, search, filter]);

  return (
    <main className="page-shell">
      <PageHeader
        eyebrow="COMPLIANCE EVIDENCE"
        title="Evidence"
        description="Review evidence collected to support compliance requirements."
      />

      <section className="content-card">
        <div className="card-header card-header-stack">
          <div>
            <h2>Evidence Overview</h2>
            <p>Evidence gathered from business processes, controls, and policies.</p>
          </div>

          <div className="toolbar">
            <label className="search-box">
              <Search size={16} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search evidence" />
            </label>
            <label className="filter-box">
              <Filter size={16} />
              <select value={filter} onChange={(event) => setFilter(event.target.value)}>
                <option value="all">All statuses</option>
                <option value="active">Active</option>
                <option value="review">Review</option>
                <option value="pending">Pending</option>
              </select>
            </label>
          </div>
        </div>

        {loading ? (
          <LoadingState message="Loading evidence from the compliance backend..." />
        ) : null}

        {!loading && error ? <ErrorState message={error} /> : null}

        {!loading && !error && filteredItems.length === 0 ? (
          <EmptyState title="No evidence found" message="Evidence will appear here once the backend records them." />
        ) : null}

        {!loading && !error && filteredItems.length > 0 ? (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Evidence</th>
                  <th>Type</th>
                  <th>Requirement</th>
                  <th>Status</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr key={item.id ?? `${item.evidence || "item"}-${index}`}>
                    <td>{item.id ?? index + 1}</td>
                    <td>{item.evidence || item.name || item.title || "Untitled evidence"}</td>
                    <td>{item.type || item.kind || "N/A"}</td>
                    <td>{item.requirement || item.requirements || item.category || "N/A"}</td>
                    <td><StatusBadge status={item.status || "Active"} /></td>
                    <td>{item.source || item.origin || "Unknown"}</td>
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

export default Evidence;

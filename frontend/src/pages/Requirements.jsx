import { useEffect, useMemo, useState } from "react";
import { Search, Filter } from "lucide-react";
import PageHeader from "../components/PageHeader";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import StatusBadge from "../components/StatusBadge";
import { getRequirements } from "../services/api";

function Requirements() {
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const loadRequirements = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getRequirements();
        setRequirements(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error("Requirements API error:", err);
        setError("Unable to connect to the TrustLens AI backend.");
      } finally {
        setLoading(false);
      }
    };

    loadRequirements();
  }, []);

  const categories = useMemo(() => {
    return [
      ...new Set(
        requirements
          .map((item) => item.category || item.type || "Uncategorized")
          .filter(Boolean)
      ),
    ];
  }, [requirements]);

  const filteredRequirements = useMemo(() => {
    return requirements.filter((item) => {
      const text = [item.title, item.category, item.status]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesSearch = text.includes(search.toLowerCase());
      const matchesCategory = category === "all" || String(item.category || item.type || "uncategorized").toLowerCase() === category;
      return matchesSearch && matchesCategory;
    });
  }, [requirements, search, category]);

  return (
    <main className="page-shell">
      <PageHeader
        eyebrow="COMPLIANCE REQUIREMENTS"
        title="Requirements"
        description="Review regulatory and organizational requirements identified by TrustLens."
      />

      <section className="content-card">
        <div className="card-header card-header-stack">
          <div>
            <h2>Compliance Requirements</h2>
            <p>Requirements extracted from your organization's compliance documents.</p>
          </div>

          <div className="toolbar">
            <label className="search-box">
              <Search size={16} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search requirements"
              />
            </label>
            <label className="filter-box">
              <Filter size={16} />
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                <option value="all">All categories</option>
                {categories.map((item) => (
                  <option key={item} value={item.toLowerCase()}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {loading ? (
          <LoadingState message="Loading requirements..." />
        ) : null}

        {!loading && error ? <ErrorState message={error} /> : null}

        {!loading && !error && filteredRequirements.length === 0 ? (
          <EmptyState
            title="No requirements found"
            message="TrustLens will list requirements as data becomes available."
          />
        ) : null}

        {!loading && !error && filteredRequirements.length > 0 ? (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Requirement</th>
                  <th>Category</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequirements.map((requirement, index) => (
                  <tr key={requirement.id ?? `${index}`}>
                    <td>{requirement.id ?? index + 1}</td>
                    <td>{requirement.title || requirement.name || "Untitled requirement"}</td>
                    <td>{requirement.category || requirement.type || "Uncategorized"}</td>
                    <td>
                      <StatusBadge status={requirement.status || "Identified"} />
                    </td>
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

export default Requirements;
function StatusBadge({ status, type = "status" }) {
  const value = String(status ?? "Unknown").trim();
  const normalized = value.toLowerCase();

  let className = "badge";

  if (type === "severity") {
    if (normalized.includes("critical")) className += " badge-danger";
    else if (normalized.includes("high")) className += " badge-danger";
    else if (normalized.includes("medium")) className += " badge-warning";
    else if (normalized.includes("low")) className += " badge-success";
    else className += " badge-neutral";
  } else {
    if (normalized.includes("complete") || normalized.includes("compliant")) className += " badge-success";
    else if (normalized.includes("progress") || normalized.includes("partial")) className += " badge-warning";
    else if (normalized.includes("open") || normalized.includes("high") || normalized.includes("critical")) className += " badge-danger";
    else className += " badge-neutral";
  }

  return <span className={className}>{value || "Unknown"}</span>;
}

export default StatusBadge;

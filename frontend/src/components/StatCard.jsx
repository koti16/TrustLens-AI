function StatCard({ label, value, description, icon: Icon }) {
  return (
    <article className="stat-card">
      <div className="stat-icon">
        {Icon ? <Icon size={20} /> : null}
      </div>

      <div>
        <p className="stat-label">{label}</p>
        <h3>{value}</h3>
        <p className="stat-description">{description}</p>
      </div>
    </article>
  );
}

export default StatCard;

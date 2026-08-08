function EmptyState({ title, message, action }) {
  return (
    <div className="state-card empty-state">
      <h3>{title}</h3>
      <p>{message}</p>
      {action ? <div className="state-actions">{action}</div> : null}
    </div>
  );
}

export default EmptyState;

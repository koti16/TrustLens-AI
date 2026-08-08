function LoadingState({ message = "Loading data..." }) {
  return (
    <div className="state-card loading-state">
      <div className="spinner" />
      <h3>Loading</h3>
      <p>{message}</p>
    </div>
  );
}

export default LoadingState;

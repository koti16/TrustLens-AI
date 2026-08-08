function ErrorState({ title = "Unable to connect", message = "Unable to connect to the TrustLens AI backend." }) {
  return (
    <div className="state-card error-state">
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}

export default ErrorState;

import React from "react";

interface Props {
  success?: boolean;
  message?: string;
}

const ResultCard: React.FC<Props> = ({ success, message }) => {
  return (
    <div className={`card status-card ${success ? 'success' : ''}`}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 12,
          height: 12,
          borderRadius: 12,
          background: success ? 'var(--success)' : 'var(--primary)'
        }} />
        <strong>{success ? 'Verified' : 'Result'}</strong>
      </div>
      {message ? <div className="muted" style={{ marginTop: 10 }}>{message}</div> : null}
    </div>
  );
};

export default ResultCard;
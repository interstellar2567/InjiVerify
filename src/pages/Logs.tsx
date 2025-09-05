import React from "react";

const Logs: React.FC = () => {
  return (
    <section className="card">
      <h2 style={{ marginTop: 0 }}>Logs</h2>
      <div className="muted" style={{ padding: 12, border: '1px dashed var(--border)', borderRadius: 12 }}>
        No logs yet. Scan a QR to create your first entry.
      </div>
    </section>
  );
};

export default Logs;
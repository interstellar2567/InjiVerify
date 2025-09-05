import React from "react";

const Home: React.FC = () => {
  return (
    <section className="grid hero">
      <div>
        <h1 className="title">Offline VC Verification</h1>
        <p className="subtitle muted">Scan a QR and verify credentials instantly, even without internet.</p>
        <div style={{ display: 'flex', gap: 12 }}>
          <a href="/scan" className="btn">Start Scanning</a>
          <a href="/logs" className="btn secondary">View Logs</a>
        </div>
      </div>
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Quick Stats</h3>
        <div className="grid cols-3">
          <div className="stat"><div className="muted">Scans Today</div><div style={{ fontSize: 20, fontWeight: 700 }}>0</div></div>
          <div className="stat"><div className="muted">Valid</div><div style={{ fontSize: 20, fontWeight: 700, color: 'var(--success)' }}>0</div></div>
          <div className="stat"><div className="muted">Invalid</div><div style={{ fontSize: 20, fontWeight: 700, color: 'var(--danger)' }}>0</div></div>
        </div>
      </div>
    </section>
  );
};

export default Home;
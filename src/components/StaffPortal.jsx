import React, { useState } from 'react';
import { Scan, CheckCircle2, AlertTriangle, UserCheck } from 'lucide-react';
import { validateQrToken, generateDynamicQrToken } from '../lib/services/qrSecurityService';

export default function StaffPortal() {
  const [usedNonces] = useState(() => new Set());
  const [scanResult, setScanResult] = useState(null);

  const handleSimulateScan = (resultType) => {
    if (resultType === 'VALID') {
      const validToken = generateDynamicQrToken('BK-9041', 'Rahul Sharma', 'A-03');
      const verification = validateQrToken(validToken, usedNonces);
      setScanResult({
        type: 'VALID',
        member: 'Rahul Sharma',
        seat: `Seat ${verification.details.seatNumber}`,
        slot: 'Morning (06:00 - 12:00)',
        time: verification.details.checkInTime
      });
    } else if (resultType === 'EXPIRED') {
      const expiredToken = generateDynamicQrToken('BK-9041', 'Rahul Sharma', 'A-03');
      expiredToken.expiresAt = Math.floor(Date.now() / 1000) - 60; // Expired 60s ago
      const verification = validateQrToken(expiredToken, usedNonces);
      setScanResult({
        type: 'EXPIRED',
        reason: verification.message
      });
    } else if (resultType === 'ALREADY_CHECKED_IN') {
      const replayToken = generateDynamicQrToken('BK-8820', 'Priya Verma', 'A-02');
      usedNonces.add(replayToken.nonce); // Replay nonce
      const verification = validateQrToken(replayToken, usedNonces);
      setScanResult({
        type: 'ALREADY_CHECKED_IN',
        member: 'Priya Verma',
        seat: 'Seat A-02',
        checkedInAt: '12:04 PM',
        message: verification.message
      });
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="card" style={{ marginBottom: '1.5rem', textAlign: 'center', background: '#0f172a', color: '#fff' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(217, 119, 6, 0.2)', border: '1px solid rgba(217, 119, 6, 0.4)', color: '#fcd34d', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem' }}>
          <Scan size={14} /> FRONT DESK KIOSK QR SCANNER
        </div>
        <h1 style={{ fontFamily: 'var(--font-family-display)', fontSize: '2rem', fontWeight: 700, color: '#f8fafc' }}>
          Member Attendance Validation
        </h1>
        <p style={{ color: '#cbd5e1', fontSize: '0.90rem', marginTop: '0.25rem' }}>
          Evaluates HMAC signature, 30s TTL expiry, and single-use nonces to reject screenshots and replay attacks.
        </p>

        {/* SCANNER SIMULATION CONTROLS */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1.5rem' }}>
          <button className="btn btn-primary" onClick={() => handleSimulateScan('VALID')}>
            <CheckCircle2 size={16} /> Scan Valid HMAC QR
          </button>
          <button className="btn btn-danger" onClick={() => handleSimulateScan('EXPIRED')}>
            <AlertTriangle size={16} /> Scan Expired Token
          </button>
          <button className="btn btn-secondary" onClick={() => handleSimulateScan('ALREADY_CHECKED_IN')}>
            <UserCheck size={16} /> Scan Replay Nonce
          </button>
        </div>
      </div>

      {/* SCAN FEEDBACK BOARD */}
      {scanResult && (
        <div className="card" style={{ marginBottom: '1.5rem', border: `2px solid ${scanResult.type === 'VALID' ? 'var(--color-status-success)' : scanResult.type === 'EXPIRED' ? 'var(--color-status-error)' : 'var(--color-status-warning)'}`, background: scanResult.type === 'VALID' ? 'var(--color-status-success-bg)' : scanResult.type === 'EXPIRED' ? 'var(--color-status-error-bg)' : 'var(--color-status-warning-bg)' }}>
          {scanResult.type === 'VALID' && (
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <CheckCircle2 size={48} color="var(--color-status-success)" style={{ margin: '0 auto 0.5rem auto' }} />
              <h2 style={{ fontSize: '1.5rem', color: 'var(--color-status-success)', fontWeight: 700 }}>HMAC CHECK-IN SUCCESSFUL</h2>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '0.5rem' }}>{scanResult.member}</div>
              <div style={{ fontSize: '0.90rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem' }}>
                Assigned to <strong>{scanResult.seat}</strong> • Logged at {scanResult.time}
              </div>
            </div>
          )}

          {scanResult.type === 'EXPIRED' && (
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <AlertTriangle size={48} color="var(--color-status-error)" style={{ margin: '0 auto 0.5rem auto' }} />
              <h2 style={{ fontSize: '1.5rem', color: 'var(--color-status-error)', fontWeight: 700 }}>CHECK-IN REJECTED</h2>
              <div style={{ fontSize: '0.90rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
                {scanResult.reason}
              </div>
            </div>
          )}

          {scanResult.type === 'ALREADY_CHECKED_IN' && (
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <UserCheck size={48} color="var(--color-status-warning)" style={{ margin: '0 auto 0.5rem auto' }} />
              <h2 style={{ fontSize: '1.5rem', color: 'var(--color-status-warning)', fontWeight: 700 }}>REPLAY ATTACK REJECTED</h2>
              <div style={{ fontSize: '0.90rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
                {scanResult.message}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TODAY'S DESK CHECK-IN STREAM */}
      <div className="card">
        <h2 className="card-title" style={{ marginBottom: '1rem' }}>Today's Front Desk Attendance Stream</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Member Name</th>
              <th>Desk Assigned</th>
              <th>Slot Time</th>
              <th>Check-in Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Rahul Sharma</strong></td>
              <td>Seat A-03</td>
              <td>06:00 AM - 12:00 PM</td>
              <td><span className="badge badge-success">CHECKED_IN</span></td>
              <td><button className="btn btn-sm btn-secondary" onClick={() => alert('Simulated Staff Manual Override')}>Manual Override</button></td>
            </tr>
            <tr>
              <td><strong>Priya Verma</strong></td>
              <td>Seat A-02</td>
              <td>12:00 PM - 06:00 PM</td>
              <td><span className="badge badge-success">CHECKED_IN</span></td>
              <td><button className="btn btn-sm btn-secondary" onClick={() => alert('Simulated Staff Manual Override')}>Manual Override</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

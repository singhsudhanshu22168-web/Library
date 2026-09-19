import React, { useState } from 'react';
import { Users, LayoutGrid, Zap, PhoneCall, Settings, X, Lock, RefreshCw } from 'lucide-react';
import { MOCK_SEATS, MOCK_MEMBERS, MOCK_AUTOMATIONS, MOCK_CALL_QUEUE } from '../data/mockData';
import { dispatchVoiceReminderCall, ExotelVoiceAdapter, isQuietHoursActive } from '../lib/services/voiceCallService';
import { evaluateNoShowBookings } from '../lib/services/studyFlowGuardian';

export default function AdminPortal() {
  const [adminTab, setAdminTab] = useState('live-floor');
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [overrideReason, setOverrideReason] = useState('Broken Power Outlet');
  const [guardianLog, setGuardianLog] = useState(null);
  const [voiceDispatchResult, setVoiceDispatchResult] = useState(null);

  const handleRunStudyFlowGuardian = () => {
    const result = evaluateNoShowBookings(new Date().toISOString());
    setGuardianLog(`Evaluated Grace Period: Released ${result.releasedCount} seat (${result.releasedSeatIds.join(', ')}) & promoted waitlisted member (${result.promotedWaitlistUsers.join(', ')}).`);
  };

  const handleTriggerVoiceCall = async (member) => {
    const adapter = new ExotelVoiceAdapter();
    const result = await dispatchVoiceReminderCall(
      {
        toPhoneNumber: member.phone,
        memberId: member.id,
        scriptTemplateKey: 'RENEWAL_EXPIRING_3D',
        templateVariables: { student_name: member.name, plan_name: member.plan, expiry_date: member.expiry }
      },
      adapter
    );

    setVoiceDispatchResult(result.message);
  };

  return (
    <div>
      {/* --- ADMIN EXECUTIVE KPI BAR --- */}
      <div style={{ background: '#0f172a', color: '#fff', padding: '1.5rem', borderRadius: 'var(--radius-xl)', marginBottom: '1.5rem', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <span style={{ fontSize: '0.70rem', textTransform: 'uppercase', tracking: '0.1em', color: '#94a3b8', fontWeight: 700 }}>EXECUTIVE OPERATIONAL DASHBOARD</span>
            <h1 style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.75rem', fontWeight: 700, color: '#f8fafc', margin: '0.1rem 0 0 0' }}>
              Facility Control Center — Branch 01 (Central)
            </h1>
          </div>
          <span className="badge badge-success" style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
            ● System Operational (Live WebSockets)
          </span>
        </div>

        <div className="grid-4" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
          <div style={{ background: '#1e293b', padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid #334155' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Live Occupancy</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#4ade80', margin: '0.2rem 0' }}>78%</div>
            <div style={{ fontSize: '0.70rem', color: '#94a3b8' }}>11 / 14 Desks Occupied</div>
          </div>

          <div style={{ background: '#1e293b', padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid #334155' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Today's Bookings</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f8fafc', margin: '0.2rem 0' }}>42 Slots</div>
            <div style={{ fontSize: '0.70rem', color: '#94a3b8' }}>↑ 8% vs yesterday</div>
          </div>

          <div style={{ background: '#1e293b', padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid #334155' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>No-Shows Today</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f87171', margin: '0.2rem 0' }}>2 Releases</div>
            <div style={{ fontSize: '0.70rem', color: '#94a3b8' }}>Auto-waitlist triggered</div>
          </div>

          <div style={{ background: '#1e293b', padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid #334155' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Expiring Members</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fbbf24', margin: '0.2rem 0' }}>6 (Next 3D)</div>
            <div style={{ fontSize: '0.70rem', color: '#94a3b8' }}>Voice campaigns active</div>
          </div>

          <div style={{ background: '#1e293b', padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid #334155' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Today's Revenue</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f8fafc', margin: '0.2rem 0' }}>₹14,280</div>
            <div style={{ fontSize: '0.70rem', color: '#4ade80' }}>100% Verified Gateway</div>
          </div>
        </div>
      </div>

      {/* --- ADMIN TABS NAVIGATION --- */}
      <div className="tabs-nav">
        <button className={`tab-btn ${adminTab === 'live-floor' ? 'active' : ''}`} onClick={() => setAdminTab('live-floor')}>
          <LayoutGrid size={14} /> Live Floor Map
        </button>
        <button className={`tab-btn ${adminTab === 'members' ? 'active' : ''}`} onClick={() => setAdminTab('members')}>
          <Users size={14} /> Members Directory ({MOCK_MEMBERS.length})
        </button>
        <button className={`tab-btn ${adminTab === 'automations' ? 'active' : ''}`} onClick={() => setAdminTab('automations')}>
          <Zap size={14} /> Automation Center
        </button>
        <button className={`tab-btn ${adminTab === 'calls' ? 'active' : ''}`} onClick={() => setAdminTab('calls')}>
          <PhoneCall size={14} /> Voice Call Campaigns
        </button>
        <button className={`tab-btn ${adminTab === 'settings' ? 'active' : ''}`} onClick={() => setAdminTab('settings')}>
          <Settings size={14} /> System Settings
        </button>
      </div>

      {/* --- LIVE FLOOR MAP TAB --- */}
      {adminTab === 'live-floor' && (
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Real-Time Operational Floor Map</h2>
              <span style={{ fontSize: '0.80rem', color: 'var(--color-text-secondary)' }}>Click any desk node to inspect occupant details or execute administrative overrides.</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-sm btn-primary" onClick={handleRunStudyFlowGuardian}>
                <Zap size={14} /> Run StudyFlow No-Show Guardian
              </button>
              <button className="btn btn-sm btn-secondary"><RefreshCw size={14} /> Refresh Sync</button>
            </div>
          </div>

          {guardianLog && (
            <div style={{ background: 'var(--color-accent-subtle)', color: 'var(--color-accent-primary)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.85rem', fontWeight: 600, border: '1px solid var(--color-accent-border)' }}>
              ⚡ StudyFlow Guardian Log: {guardianLog}
            </div>
          )}

          <div className="seat-map-container" style={{ background: '#f8fafc' }}>
            <div className="seat-grid">
              {MOCK_SEATS.map((seat) => (
                <div
                  key={seat.id}
                  className={`seat-node ${selectedSeat?.id === seat.id ? 'selected' : ''} ${seat.status === 'OCCUPIED' ? 'occupied' : ''} ${seat.status === 'BLOCKED' ? 'blocked' : ''}`}
                  onClick={() => setSelectedSeat(seat)}
                >
                  <div className="seat-label">{seat.id}</div>
                  <div className="seat-type">{seat.zone}</div>
                  {seat.status === 'OCCUPIED' && <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{seat.occupant}</div>}
                  {seat.status === 'BLOCKED' && <div style={{ fontSize: '0.65rem', color: 'var(--color-status-error)', fontWeight: 700 }}>LOCKED</div>}
                </div>
              ))}
            </div>
          </div>

          {/* INSPECTOR DRAWER PANEL FOR SELECTED SEAT */}
          {selectedSeat && (
            <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: 'var(--color-bg-base)', border: '2px solid var(--color-border-strong)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span className="badge badge-info">SEAT INSPECTOR</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '0.25rem' }}>Desk {selectedSeat.id} ({selectedSeat.zone})</h3>
                </div>
                <button className="btn btn-sm btn-secondary" onClick={() => setSelectedSeat(null)}><X size={14} /></button>
              </div>

              <div className="grid-3" style={{ margin: '1rem 0' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Status</span>
                  <div style={{ fontWeight: 600 }}>{selectedSeat.status}</div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Current Occupant</span>
                  <div style={{ fontWeight: 600 }}>{selectedSeat.occupant || 'None'}</div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Desk Amenities</span>
                  <div style={{ fontSize: '0.85rem' }}>{selectedSeat.power ? '⚡ Power Outlet' : 'No Power'} • {selectedSeat.window ? '🪟 Window View' : 'Standard'}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '1rem' }}>
                <button className="btn btn-sm btn-danger" onClick={() => setShowOverrideModal(true)}>
                  <Lock size={14} /> Lock Seat for Maintenance
                </button>
                <button className="btn btn-sm btn-secondary" onClick={() => alert(`Simulated Force Check-Out for ${selectedSeat.id}`)}>
                  Force Check-Out
                </button>
                <button className="btn btn-sm btn-secondary" onClick={() => alert(`Simulated Seat Reassignment from ${selectedSeat.id}`)}>
                  Reassign Student
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- MEMBERS DIRECTORY TAB --- */}
      {adminTab === 'members' && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Member Directory</h2>
            <input type="text" placeholder="Search members by name or phone..." className="btn btn-secondary" style={{ width: '280px', padding: '0.5rem' }} />
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Member ID</th>
                <th>Full Name</th>
                <th>Contact</th>
                <th>Active Plan</th>
                <th>Plan Expiry</th>
                <th>Status</th>
                <th>Hours Logged</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_MEMBERS.map((m) => (
                <tr key={m.id}>
                  <td style={{ fontFamily: 'var(--font-family-mono)', fontWeight: 600 }}>{m.id}</td>
                  <td><strong>{m.name}</strong></td>
                  <td>{m.phone}</td>
                  <td>{m.plan}</td>
                  <td>{m.expiry}</td>
                  <td>
                    <span className={`badge ${m.status === 'ACTIVE' ? 'badge-success' : 'badge-warning'}`}>
                      {m.status}
                    </span>
                  </td>
                  <td><strong>{m.hours}h</strong></td>
                  <td>
                    <button className="btn btn-sm btn-primary" onClick={() => handleTriggerVoiceCall(m)}>
                      <PhoneCall size={13} /> Trigger Call
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* --- AUTOMATION CENTER TAB --- */}
      {adminTab === 'automations' && (
        <div className="card">
          <h2 className="card-title" style={{ marginBottom: '1rem' }}>Automation Center Workflows</h2>
          <div className="grid-2">
            {MOCK_AUTOMATIONS.map((a) => (
              <div key={a.id} style={{ border: '1px solid var(--color-border-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-base)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge badge-success">● {a.status}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Dispatched Today: <strong>{a.sentToday}</strong></span>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '0.5rem 0' }}>{a.name}</h3>
                <div style={{ fontSize: '0.80rem', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div><strong>Trigger:</strong> {a.trigger}</div>
                  <div><strong>Channels:</strong> {a.channel}</div>
                </div>
                <button className="btn btn-sm btn-secondary" style={{ marginTop: '1rem' }}>Edit Template & Variables</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- VOICE CALL CAMPAIGNS TAB --- */}
      {adminTab === 'calls' && (
        <div className="card">
          <div style={{ background: isQuietHoursActive() ? '#fffbe6' : '#f0fdf4', border: `1px solid ${isQuietHoursActive() ? 'var(--color-accent-border)' : '#bbf7d0'}`, padding: '1rem', borderRadius: 'var(--radius-lg)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: isQuietHoursActive() ? 'var(--color-accent-primary)' : 'var(--color-status-success)', fontWeight: 600 }}>
              <PhoneCall size={18} /> {isQuietHoursActive() ? 'Quiet Hours Currently ACTIVE (21:00 - 08:00) — Voice Dispatch Paused' : 'Voice Dispatch Engine ONLINE'}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Provider Adapter: Exotel Telephony API</span>
          </div>

          {voiceDispatchResult && (
            <div style={{ background: 'var(--color-bg-base)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.85rem', fontWeight: 600, border: '1px solid var(--color-border-subtle)' }}>
              📞 Call Result: {voiceDispatchResult}
            </div>
          )}

          <h2 className="card-title" style={{ marginBottom: '1rem' }}>Automated Voice Call Queue</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Call Ref</th>
                <th>Target Member</th>
                <th>Trigger Reason</th>
                <th>Status</th>
                <th>Attempts</th>
                <th>Scheduled Window</th>
                <th>Call Result / Notes</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_CALL_QUEUE.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontFamily: 'var(--font-family-mono)' }}>{c.id}</td>
                  <td><strong>{c.member}</strong></td>
                  <td>{c.reason}</td>
                  <td>
                    <span className={`badge ${c.status === 'QUEUED' ? 'badge-warning' : c.status === 'ANSWERED' ? 'badge-success' : 'badge-error'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td>{c.attempts} / 2</td>
                  <td>{c.scheduledFor}</td>
                  <td style={{ fontSize: '0.80rem' }}>{c.result || 'Awaiting dispatch'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* --- SYSTEM SETTINGS TAB --- */}
      {adminTab === 'settings' && (
        <div className="card">
          <h2 className="card-title" style={{ marginBottom: '1.25rem' }}>Facility Configuration & Business Rules</h2>
          <div className="grid-2">
            <div>
              <label style={{ fontSize: '0.80rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Grace Period Offset (Minutes)</label>
              <input type="number" defaultValue={15} className="btn btn-secondary" style={{ width: '100%', textAlign: 'left' }} />
            </div>

            <div>
              <label style={{ fontSize: '0.80rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Advance Booking Window (Days)</label>
              <input type="number" defaultValue={7} className="btn btn-secondary" style={{ width: '100%', textAlign: 'left' }} />
            </div>

            <div>
              <label style={{ fontSize: '0.80rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Quiet Hours Start Time</label>
              <input type="text" defaultValue="21:00" className="btn btn-secondary" style={{ width: '100%', textAlign: 'left' }} />
            </div>

            <div>
              <label style={{ fontSize: '0.80rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Quiet Hours End Time</label>
              <input type="text" defaultValue="08:00" className="btn btn-secondary" style={{ width: '100%', textAlign: 'left' }} />
            </div>
          </div>

          <button className="btn btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => alert('Settings saved in production architecture configuration.')}>
            Save Configuration Changes
          </button>
        </div>
      )}

      {/* ADMINISTRATIVE OVERRIDE MODAL */}
      {showOverrideModal && (
        <div className="modal-overlay" onClick={() => setShowOverrideModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Lock Seat {selectedSeat?.id} for Maintenance</h3>
              <button onClick={() => setShowOverrideModal(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <div className="modal-body">
              <div className="badge badge-error" style={{ marginBottom: '1rem', width: '100%', justifyContent: 'center' }}>
                ⚠️ Mandatory Audit Log Requirement
              </div>

              <label style={{ fontSize: '0.80rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Select Override Reason</label>
              <select className="btn btn-secondary" style={{ width: '100%', marginBottom: '1rem' }} value={overrideReason} onChange={(e) => setOverrideReason(e.target.value)}>
                <option>Broken Power Outlet</option>
                <option>Ergonomic Chair Replacement</option>
                <option>Acoustic Isolation Cleaning</option>
                <option>Reserved for VIP Guest</option>
              </select>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowOverrideModal(false)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => { alert(`Desk ${selectedSeat?.id} locked. Audit log created: ${overrideReason}`); setShowOverrideModal(false); setSelectedSeat(null); }}>
                Confirm Lock & Create Audit Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

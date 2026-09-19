import React, { useState, useEffect } from 'react';
import { Calendar, Clock, QrCode, CheckCircle2, AlertTriangle, RefreshCw, X, Download, CreditCard, Award } from 'lucide-react';
import { MOCK_USER, MOCK_SEATS, MOCK_BOOKINGS } from '../data/mockData';
import { createSeatReservation } from '../lib/services/bookingEngine';
import { generateDynamicQrToken } from '../lib/services/qrSecurityService';
import { createRazorpayOrder, handleRazorpayWebhook } from '../lib/services/paymentService';

export default function StudentPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrTokenPayload, setQrTokenPayload] = useState(null);
  const [qrTimer, setQrTimer] = useState(30);

  // Seat booking state
  const [bookingDate, setBookingDate] = useState('Today, Sep 18');
  const [bookingSlot, setBookingSlot] = useState('Morning (06:00 - 12:00)');
  const [selectedZone, setSelectedZone] = useState('All');
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  // Payment state
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  // Generate dynamic cryptographic QR payload when modal opens or timer resets
  useEffect(() => {
    if (showQrModal) {
      const payload = generateDynamicQrToken('BK-9041', MOCK_USER.name, selectedSeat || 'A-03');
      setQrTokenPayload(payload);
    }
  }, [showQrModal, qrTimer, selectedSeat]);

  // 30-second Dynamic QR refresh countdown
  useEffect(() => {
    let interval = null;
    if (showQrModal) {
      interval = setInterval(() => {
        setQrTimer((prev) => (prev > 1 ? prev - 1 : 30));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showQrModal]);

  const handleReservationSubmit = async () => {
    setBookingError(null);
    const response = await createSeatReservation({
      profileId: MOCK_USER.name,
      membershipId: 'MEM-901',
      seatId: selectedSeat,
      bookingDate,
      timeSlotStart: bookingSlot.includes('06:00') ? '06:00' : '12:00',
      timeSlotEnd: bookingSlot.includes('12:00') ? '12:00' : '18:00'
    });

    if (response.success) {
      setBookingConfirmed(true);
    } else {
      setBookingError(response.message);
    }
  };

  const handleSimulatePaymentWebhook = async () => {
    const order = await createRazorpayOrder({ profileId: MOCK_USER.name, planId: 'PLAN-PRO', amountInr: 5898.82 });
    const webhookResult = await handleRazorpayWebhook({
      event: 'payment.captured',
      paymentId: `pay_${Math.random().toString(36).substring(2, 10)}`,
      orderId: order.orderId,
      signature: 'hmac_sha256_razorpay_verified_signature',
      idempotencyKey: `idempotency_${order.orderId}`
    });

    setPaymentStatus(webhookResult.message);
    setTimeout(() => {
      setShowRenewModal(false);
      setPaymentStatus(null);
    }, 2000);
  };

  const filteredSeats = MOCK_SEATS.filter(s => selectedZone === 'All' || s.zone === selectedZone);

  return (
    <div>
      {/* --- STUDENT HEADER --- */}
      <div style={{ background: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border-subtle)', padding: '1.5rem 0', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.80rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>STUDENT PORTAL</span>
            <h1 style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.75rem', fontWeight: 700, margin: '0.2rem 0 0 0' }}>
              Welcome back, {MOCK_USER.name} 👋
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{MOCK_USER.membership}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-status-warning)' }}>● {MOCK_USER.expiresInDays} Days Remaining ({MOCK_USER.expiryDate})</div>
            </div>

            <button className="btn btn-primary" onClick={() => setShowRenewModal(true)}>
              Renew Plan
            </button>
          </div>
        </div>

        {/* PORTAL NAVIGATION TABS */}
        <div className="tabs-nav" style={{ marginTop: '1.5rem', marginBottom: 0 }}>
          <button className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            Dashboard Overview
          </button>
          <button className={`tab-btn ${activeTab === 'book' ? 'active' : ''}`} onClick={() => setActiveTab('book')}>
            Book a Seat
          </button>
          <button className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>
            My Bookings ({MOCK_BOOKINGS.length})
          </button>
          <button className={`tab-btn ${activeTab === 'attendance' ? 'active' : ''}`} onClick={() => setActiveTab('attendance')}>
            Study Hours ({MOCK_USER.totalHours}h)
          </button>
          <button className={`tab-btn ${activeTab === 'billing' ? 'active' : ''}`} onClick={() => setActiveTab('billing')}>
            Membership & Invoices
          </button>
        </div>
      </div>

      {/* --- DASHBOARD TAB --- */}
      {activeTab === 'dashboard' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ border: '2px solid var(--color-accent-primary)', background: 'linear-gradient(to right, #ffffff, #fffbe6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge badge-success">● CONFIRMED ACTIVE BOOKING</span>
              <span style={{ fontSize: '0.80rem', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-family-mono)' }}>ID: BK-9041</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', margin: '1.25rem 0' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Assigned Desk</span>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>Seat A-03</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-accent-primary)' }}>Silent Focus Zone</div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Schedule Date</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>Today, Sep 18</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Morning Slot</div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Time Slot Window</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>06:00 AM - 12:00 PM</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-status-warning)' }}>Grace window ends in 12m</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <button className="btn btn-primary" onClick={() => setShowQrModal(true)} style={{ padding: '0.75rem 1.25rem' }}>
                  <QrCode size={18} /> View Dynamic Check-In QR
                </button>
              </div>
            </div>
          </div>

          <div className="grid-3">
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
                <span>Total Study Duration</span>
                <Clock size={18} color="var(--color-accent-primary)" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0 0.2rem 0' }}>{MOCK_USER.totalHours} hrs</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-status-success)' }}>↑ 12.4 hrs logged this week</div>
            </div>

            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
                <span>Current Study Streak</span>
                <Award size={18} color="var(--color-accent-primary)" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0 0.2rem 0' }}>{MOCK_USER.streakDays} Days</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Keep logging sessions daily!</div>
            </div>

            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
                <span>Plan Expiry Countdown</span>
                <Calendar size={18} color="var(--color-accent-primary)" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0 0.2rem 0', color: 'var(--color-status-warning)' }}>{MOCK_USER.expiresInDays} Days</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Expiring on {MOCK_USER.expiryDate}</div>
            </div>
          </div>
        </div>
      )}

      {/* --- SEAT BOOKING TAB --- */}
      {activeTab === 'book' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {bookingConfirmed ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <CheckCircle2 size={56} color="var(--color-status-success)" style={{ margin: '0 auto 1rem auto' }} />
              <h2 style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.75rem' }}>Seat Reservation Confirmed!</h2>
              <p style={{ color: 'var(--color-text-secondary)', margin: '0.5rem 0 1.5rem 0' }}>
                You have successfully reserved <strong>Seat {selectedSeat}</strong> for {bookingDate} ({bookingSlot}).
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button className="btn btn-primary" onClick={() => setShowQrModal(true)}>
                  <QrCode size={18} /> Open Dynamic Check-In QR
                </button>
                <button className="btn btn-secondary" onClick={() => { setBookingConfirmed(false); setSelectedSeat(null); }}>
                  Book Another Seat
                </button>
              </div>
            </div>
          ) : (
            <div className="card">
              <h2 className="card-title" style={{ marginBottom: '1rem' }}>Reserve Your Study Desk</h2>

              {bookingError && (
                <div style={{ background: 'var(--color-status-error-bg)', color: 'var(--color-status-error)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', border: '1px solid #fecaca', fontSize: '0.85rem', fontWeight: 600 }}>
                  ⚠️ {bookingError}
                </div>
              )}

              <div className="grid-3" style={{ marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.80rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.35rem' }}>Select Date</label>
                  <select className="btn btn-secondary" style={{ width: '100%', padding: '0.6rem' }} value={bookingDate} onChange={(e) => setBookingDate(e.target.value)}>
                    <option>Today, Sep 18</option>
                    <option>Tomorrow, Sep 19</option>
                    <option>Saturday, Sep 20</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.80rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.35rem' }}>Select Time Slot</label>
                  <select className="btn btn-secondary" style={{ width: '100%', padding: '0.6rem' }} value={bookingSlot} onChange={(e) => setBookingSlot(e.target.value)}>
                    <option>Morning (06:00 - 12:00)</option>
                    <option>Afternoon (12:00 - 18:00)</option>
                    <option>Evening (18:00 - 24:00)</option>
                    <option>Full Day (06:00 - 24:00)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.80rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.35rem' }}>Filter Zone</label>
                  <select className="btn btn-secondary" style={{ width: '100%', padding: '0.6rem' }} value={selectedZone} onChange={(e) => setSelectedZone(e.target.value)}>
                    <option value="All">All Study Zones</option>
                    <option value="Silent Focus">Silent Focus Zone</option>
                    <option value="Discussion Pod">Discussion Pods</option>
                    <option value="Window Desk">Window Desks</option>
                  </select>
                </div>
              </div>

              <div className="seat-map-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontWeight: '600', fontSize: '0.90rem' }}>Visual Seat Map Grid</span>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><span style={{ width: 12, height: 12, border: '2px solid #16a34a', borderRadius: 3 }}></span> Available</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><span style={{ width: 12, height: 12, background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: 3 }}></span> Booked</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><span style={{ width: 12, height: 12, background: '#d97706', borderRadius: 3 }}></span> Selected</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><span style={{ width: 12, height: 12, background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 3 }}></span> Blocked</span>
                  </div>
                </div>

                <div className="seat-grid">
                  {filteredSeats.map((seat) => (
                    <div
                      key={seat.id}
                      className={`seat-node ${selectedSeat === seat.id ? 'selected' : ''} ${seat.status === 'OCCUPIED' ? 'occupied' : ''} ${seat.status === 'BLOCKED' ? 'blocked' : ''}`}
                      onClick={() => seat.status === 'AVAILABLE' && setSelectedSeat(seat.id)}
                    >
                      <div className="seat-label">{seat.id}</div>
                      <div className="seat-type">{seat.zone}</div>
                      {seat.status === 'OCCUPIED' && <div style={{ fontSize: '0.60rem', color: '#64748b' }}>Booked</div>}
                      {seat.status === 'BLOCKED' && <div style={{ fontSize: '0.60rem', color: '#991b1b' }}>Repair</div>}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--color-border-subtle)' }}>
                <div>
                  {selectedSeat ? (
                    <div>Selected Desk: <strong style={{ color: 'var(--color-accent-primary)' }}>Seat {selectedSeat}</strong> ({bookingDate} • {bookingSlot})</div>
                  ) : (
                    <div style={{ color: 'var(--color-text-tertiary)', fontSize: '0.90rem' }}>Please select an available desk from the map grid above.</div>
                  )}
                </div>

                <button
                  className="btn btn-primary"
                  disabled={!selectedSeat}
                  style={{ opacity: selectedSeat ? 1 : 0.5, cursor: selectedSeat ? 'pointer' : 'not-allowed' }}
                  onClick={handleReservationSubmit}
                >
                  Confirm Reservation (Server Lock)
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- MY BOOKINGS TAB --- */}
      {activeTab === 'bookings' && (
        <div className="card">
          <h2 className="card-title" style={{ marginBottom: '1rem' }}>Booking History & Status</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Seat & Zone</th>
                <th>Schedule Date</th>
                <th>Time Slot</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_BOOKINGS.map((b) => (
                <tr key={b.id}>
                  <td style={{ fontFamily: 'var(--font-family-mono)', fontWeight: 600 }}>{b.id}</td>
                  <td><strong>Seat {b.seat}</strong> ({b.zone})</td>
                  <td>{b.date}</td>
                  <td>{b.slot}</td>
                  <td>
                    <span className={`badge ${b.status === 'CONFIRMED' ? 'badge-success' : b.status === 'COMPLETED' ? 'badge-info' : 'badge-error'}`}>
                      {b.status}
                    </span>
                  </td>
                  <td>
                    {b.status === 'CONFIRMED' ? (
                      <button className="btn btn-sm btn-primary" onClick={() => setShowQrModal(true)}>
                        <QrCode size={14} /> Open QR
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>No active QR</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* --- ATTENDANCE & HOURS TAB --- */}
      {activeTab === 'attendance' && (
        <div className="card">
          <h2 className="card-title">Study Session & Attendance History</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
            Total Verified Study Hours: <strong>{MOCK_USER.totalHours} hrs</strong> across 28 study sessions.
          </p>
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Seat</th>
                <th>Check-In Time</th>
                <th>Check-Out Time</th>
                <th>Duration Logged</th>
                <th>Verification Method</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sep 17, 2026</td>
                <td>Seat C-02</td>
                <td>12:04 PM</td>
                <td>05:58 PM</td>
                <td><strong>5h 54m</strong></td>
                <td><span className="badge badge-success">Dynamic HMAC QR</span></td>
              </tr>
              <tr>
                <td>Sep 16, 2026</td>
                <td>Seat A-01</td>
                <td>06:02 AM</td>
                <td>11:59 AM</td>
                <td><strong>5h 57m</strong></td>
                <td><span className="badge badge-success">Dynamic HMAC QR</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* --- MEMBERSHIP & BILLING TAB --- */}
      {activeTab === 'billing' && (
        <div className="card">
          <h2 className="card-title">Membership & Invoice Records</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem', background: 'var(--color-bg-base)', borderRadius: 'var(--radius-lg)', margin: '1rem 0' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Active Plan</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{MOCK_USER.membership}</div>
              <div style={{ fontSize: '0.80rem', color: 'var(--color-status-success)' }}>Renews on {MOCK_USER.expiryDate}</div>
            </div>
            <button className="btn btn-primary" onClick={() => setShowRenewModal(true)}>
              <CreditCard size={16} /> Renew Plan Now
            </button>
          </div>

          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>Past Payment Receipts</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice Ref</th>
                <th>Date</th>
                <th>Plan Item</th>
                <th>Amount Paid</th>
                <th>Status</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontFamily: 'var(--font-family-mono)' }}>INV-2026-901</td>
                <td>Sep 06, 2026</td>
                <td>Monthly Pro Plan (30 Days)</td>
                <td>₹4,999 + GST</td>
                <td><span className="badge badge-success">VERIFIED PAID</span></td>
                <td><button className="btn btn-sm btn-secondary"><Download size={14} /> PDF</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* --- DYNAMIC CRYPTOGRAPHIC CHECK-IN QR MODAL --- */}
      {showQrModal && (
        <div className="modal-overlay" onClick={() => setShowQrModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>HMAC Signed Dynamic Check-In QR</h3>
              <button onClick={() => setShowQrModal(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <div className="modal-body">
              <div style={{ padding: '1.5rem', background: '#fff', border: '2px solid var(--color-border-subtle)', borderRadius: 'var(--radius-xl)', display: 'inline-block', position: 'relative' }}>
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(JSON.stringify(qrTokenPayload))}`} alt="Check In QR" style={{ width: 220, height: 220 }} />
                <div style={{ fontSize: '0.75rem', color: 'var(--color-accent-primary)', fontWeight: 700, marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                  <RefreshCw size={14} className="spin" /> Dynamic Token Refreshes in {qrTimer}s
                </div>
              </div>

              <div style={{ marginTop: '1.25rem', fontSize: '0.85rem' }}>
                <div><strong>Seat A-03</strong> • Silent Focus Zone</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem' }}>
                  HMAC Nonce: <code style={{ fontFamily: 'var(--font-family-mono)' }}>{qrTokenPayload?.nonce}</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- RENEWAL PAYMENT MODAL --- */}
      {showRenewModal && (
        <div className="modal-overlay" onClick={() => setShowRenewModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Razorpay Server-Verified Renewal</h3>
              <button onClick={() => setShowRenewModal(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <div className="modal-body">
              {paymentStatus ? (
                <div style={{ background: 'var(--color-status-success-bg)', color: 'var(--color-status-success)', padding: '1rem', borderRadius: 'var(--radius-md)', fontWeight: 600, textAlign: 'center' }}>
                  <CheckCircle2 size={32} style={{ margin: '0 auto 0.5rem auto' }} />
                  {paymentStatus}
                </div>
              ) : (
                <>
                  <div style={{ border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                      <span>Monthly Pro Plan (30 Days)</span>
                      <span>₹4,999.00</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.80rem', color: 'var(--color-text-secondary)', marginTop: '0.35rem' }}>
                      <span>GST (18%)</span>
                      <span>₹899.82</span>
                    </div>
                    <div style={{ borderTop: '1px solid var(--color-border-subtle)', marginTop: '0.75rem', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem' }}>
                      <span>Total Amount</span>
                      <span style={{ color: 'var(--color-accent-primary)' }}>₹5,898.82</span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', textAlign: 'center' }}>
                    Clicking Pay triggers Razorpay SDK & awaits server HMAC signature webhook verification before DB membership activation.
                  </p>
                </>
              )}
            </div>

            {!paymentStatus && (
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowRenewModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSimulatePaymentWebhook}>
                  Execute Razorpay Payment & Webhook
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Clock, Users, Wifi, Sun, HelpCircle, Sparkles, MapPin, Lamp, VolumeX, BatteryCharging, Coffee, Bookmark, Award } from 'lucide-react';
import { MOCK_SEATS } from '../data/mockData';

export default function PublicHomepage({ onNavigateToBook }) {
  const [selectedSeat, setSelectedSeat] = useState('A-01');
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="homepage-content">
      {/* --- HERO SECTION --- */}
      <section className="hero-atmosphere">
        <div className="hero-bg-layer" />
        <div className="hero-scrim-layer" />

        <div className="hero-content">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(217, 119, 6, 0.1)', border: '1px solid rgba(217, 119, 6, 0.3)', padding: '0.35rem 0.95rem', borderRadius: 'var(--radius-full)', fontSize: '0.78rem', color: 'var(--color-accent-primary)', fontWeight: 600, marginBottom: '1.5rem', backdropFilter: 'blur(4px)' }}>
            <Sparkles size={14} /> Demo Facility View • 78% Occupied • 12 Desks Available Today
          </div>

          <h1 style={{ fontFamily: 'var(--font-family-display)', fontSize: '3.25rem', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.12, maxWidth: '780px', margin: '0 auto 1.25rem auto', color: 'var(--color-text-primary)' }}>
            Your Space for <span style={{ color: 'var(--color-accent-primary)' }}>Deep Focus</span>
          </h1>

          <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', maxWidth: '620px', margin: '0 auto 2.25rem auto', lineHeight: 1.6 }}>
            A modern private study space engineered for serious learning. Dedicated ergonomic desks, absolute quiet, and effortless seat reservation.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3.5rem' }}>
            <button className="btn btn-primary" onClick={onNavigateToBook} style={{ padding: '0.85rem 1.85rem', fontSize: '1rem' }}>
              Book Your Study Desk <ArrowRight size={18} />
            </button>
            <a href="#space" className="btn btn-secondary" style={{ padding: '0.85rem 1.85rem', fontSize: '1rem' }}>
              Explore The Space
            </a>
          </div>

          {/* --- SPATIAL FLOOR MAP PREVIEW CARD --- */}
          <div className="card-spatial-dark" style={{ maxWidth: '980px', margin: '0 auto', textAlign: 'left' }}>
            <div className="card-spatial-texture" />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', position: 'relative', zIndex: 2 }}>
              <div>
                <span style={{ textTransform: 'uppercase', fontSize: '0.70rem', letterSpacing: '0.1em', color: '#94a3b8', fontWeight: 700 }}>Interactive Spatial Layout</span>
                <h3 style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.25rem', color: '#f8fafc', marginTop: '0.25rem' }}>
                  Main Study Floor — Desk Availability
                </h3>
              </div>
              <span className="badge badge-success" style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                ● Live Status Preview
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', background: '#1e293b', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid #334155', position: 'relative', zIndex: 2 }}>
              {MOCK_SEATS.slice(0, 8).map((seat) => (
                <div
                  key={seat.id}
                  onClick={() => setSelectedSeat(seat.id)}
                  style={{
                    background: selectedSeat === seat.id ? 'var(--color-accent-primary)' : seat.status === 'OCCUPIED' ? '#334155' : seat.status === 'BLOCKED' ? '#451a1a' : '#0f172a',
                    border: `2px solid ${selectedSeat === seat.id ? '#fcd34d' : seat.status === 'AVAILABLE' ? '#22c55e' : '#475569'}`,
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem',
                    cursor: seat.status === 'AVAILABLE' ? 'pointer' : 'default',
                    transition: 'all 0.2s ease',
                    color: '#fff'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.80rem', fontWeight: 700 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Lamp size={14} color={selectedSeat === seat.id ? '#fff' : '#fcd34d'} /> {seat.id}
                    </span>
                    <span style={{ fontSize: '0.65rem', color: seat.status === 'AVAILABLE' ? '#4ade80' : '#94a3b8' }}>{seat.status}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: '#cbd5e1' }}>{seat.type}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#94a3b8', position: 'relative', zIndex: 2 }}>
              <span>Selected Desk: <strong style={{ color: '#fff' }}>{selectedSeat}</strong> ({MOCK_SEATS.find(s => s.id === selectedSeat)?.zone})</span>
              <button className="btn btn-sm btn-primary" onClick={onNavigateToBook}>
                Reserve Selected Desk
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- EDITORIAL STATEMENT SECTION (VISUAL RHYTHM BREAK) --- */}
      <section className="section-ethos-wrapper">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-accent-primary)', letterSpacing: '0.08em' }}>The Study Ethos</span>
          <blockquote style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '0.75rem', lineHeight: 1.35 }}>
            "Silence is not merely the absence of noise — it is the presence of clarity, discipline, and deep progress."
          </blockquote>
        </div>
      </section>

      {/* --- THE PHYSICAL STUDY ENVIRONMENT STORY --- */}
      <section id="space" className="section-space-wrapper">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ color: 'var(--color-accent-primary)', fontWeight: 700, fontSize: '0.80rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Designed For Long Focus Sessions</span>
          <h2 style={{ fontFamily: 'var(--font-family-display)', fontSize: '2.25rem', fontWeight: 700, marginTop: '0.5rem' }}>The Physical Space</h2>
        </div>

        {/* SPLIT LAYOUT VISUAL COMPOSITION */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
          <div className="card-spatial-dark">
            <div className="card-spatial-texture" />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <span className="badge badge-warning" style={{ background: 'rgba(217, 119, 6, 0.2)', color: '#fcd34d', border: '1px solid rgba(217, 119, 6, 0.4)', marginBottom: '1rem' }}>
                <VolumeX size={14} /> Quiet Protocol
              </span>
              <h3 style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.75rem', fontWeight: 700, color: '#f8fafc', marginBottom: '1rem' }}>
                Acoustic Isolation & Pure Quiet
              </h3>
              <p style={{ color: '#cbd5e1', lineHeight: 1.6, fontSize: '0.95rem' }}>
                Our study halls are built with sound-dampening acoustic wall panels and isolated carpet flooring. Ambient sound levels are maintained strictly below 35dB, allowing you to enter deep concentration effortless.
              </p>
            </div>
          </div>

          <div className="grid-2">
            <div className="card-elevated">
              <Lamp size={24} color="var(--color-accent-primary)" style={{ marginBottom: '0.75rem' }} />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Warm Desk Lighting</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>Individual anti-glare reading lamps for strain-free night study.</p>
            </div>

            <div className="card-elevated">
              <BatteryCharging size={24} color="var(--color-accent-primary)" style={{ marginBottom: '0.75rem' }} />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Dedicated Power</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>Dual sockets & USB-C fast charging built into every desk.</p>
            </div>

            <div className="card-elevated">
              <Sun size={24} color="var(--color-accent-primary)" style={{ marginBottom: '0.75rem' }} />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Climate Control</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>Optimized airflow and temperature for sustained alertness.</p>
            </div>

            <div className="card-elevated">
              <Wifi size={24} color="var(--color-accent-primary)" style={{ marginBottom: '0.75rem' }} />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Fiber Internet</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>Dual redundant gigabit fiber lines for seamless research.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section id="how-it-works" className="section-how-wrapper">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ color: 'var(--color-accent-primary)', fontWeight: 700, fontSize: '0.80rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Simple Daily Process</span>
          <h2 style={{ fontFamily: 'var(--font-family-display)', fontSize: '2.25rem', fontWeight: 700, marginTop: '0.5rem' }}>How Booking Works</h2>
        </div>

        <div className="grid-4" style={{ gap: '2rem' }}>
          <div className="card-elevated">
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-accent-primary)', fontFamily: 'var(--font-family-mono)' }}>01</div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '0.5rem' }}>Select Your Plan</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>Choose a daily pass, weekly flex, or monthly membership.</p>
          </div>

          <div className="card-elevated">
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-accent-primary)', fontFamily: 'var(--font-family-mono)' }}>02</div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '0.5rem' }}>Pick Desk & Slot</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>Reserve your exact desk on our visual floor map.</p>
          </div>

          <div className="card-elevated">
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-accent-primary)', fontFamily: 'var(--font-family-mono)' }}>03</div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '0.5rem' }}>Scan Mobile QR</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>Scan your check-in QR code at reception upon arrival.</p>
          </div>

          <div className="card-elevated">
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-accent-primary)', fontFamily: 'var(--font-family-mono)' }}>04</div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '0.5rem' }}>Focus & Progress</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>Settle into your dedicated quiet desk and accomplish your goals.</p>
          </div>
        </div>
      </section>

      {/* --- MEMBERSHIP PRICING PLANS --- */}
      <section id="plans" className="section-plans-wrapper">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ color: 'var(--color-accent-primary)', fontWeight: 700, fontSize: '0.80rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Transparent Memberships</span>
          <h2 style={{ fontFamily: 'var(--font-family-display)', fontSize: '2.25rem', fontWeight: 700, marginTop: '0.5rem' }}>Membership Options</h2>
        </div>

        <div className="grid-4">
          <div className="card-elevated" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Day Pass</h3>
              <div style={{ fontSize: '2rem', fontWeight: 700, margin: '0.75rem 0', color: 'var(--color-text-primary)' }}>₹299 <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 400 }}>/ day</span></div>
              <ul style={{ listStyle: 'none', fontSize: '0.85rem', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <li style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}><CheckCircle2 size={16} color="var(--color-status-success)" /> 1 Daily Time Slot</li>
                <li style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}><CheckCircle2 size={16} color="var(--color-status-success)" /> Standard Zones</li>
                <li style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}><CheckCircle2 size={16} color="var(--color-status-success)" /> High-Speed Wi-Fi</li>
              </ul>
            </div>
            <button className="btn btn-secondary" onClick={onNavigateToBook} style={{ marginTop: '1.5rem', width: '100%' }}>Book Day Pass</button>
          </div>

          <div className="card-elevated" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Weekly Flex</h3>
              <div style={{ fontSize: '2rem', fontWeight: 700, margin: '0.75rem 0', color: 'var(--color-text-primary)' }}>₹1,499 <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 400 }}>/ 7 days</span></div>
              <ul style={{ listStyle: 'none', fontSize: '0.85rem', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <li style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}><CheckCircle2 size={16} color="var(--color-status-success)" /> Daily Booking Access</li>
                <li style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}><CheckCircle2 size={16} color="var(--color-status-success)" /> 3 Days Advance Booking</li>
                <li style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}><CheckCircle2 size={16} color="var(--color-status-success)" /> Silent Focus Zone</li>
              </ul>
            </div>
            <button className="btn btn-secondary" onClick={onNavigateToBook} style={{ marginTop: '1.5rem', width: '100%' }}>Select Weekly</button>
          </div>

          <div className="card-elevated" style={{ border: '2px solid var(--color-accent-primary)', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 12px 30px -5px rgba(217, 119, 6, 0.15)' }}>
            <span style={{ position: 'absolute', top: '-12px', right: '16px', background: 'var(--color-accent-primary)', color: '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', textTransform: 'uppercase' }}>Most Popular</span>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Monthly Pro</h3>
              <div style={{ fontSize: '2rem', fontWeight: 700, margin: '0.75rem 0', color: 'var(--color-accent-primary)' }}>₹4,999 <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 400 }}>/ 30 days</span></div>
              <ul style={{ listStyle: 'none', fontSize: '0.85rem', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <li style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}><CheckCircle2 size={16} color="var(--color-status-success)" /> Unlimited Daily Booking</li>
                <li style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}><CheckCircle2 size={16} color="var(--color-status-success)" /> 7 Days Advance Booking</li>
                <li style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}><CheckCircle2 size={16} color="var(--color-status-success)" /> Priority Auto-Waitlist</li>
                <li style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}><CheckCircle2 size={16} color="var(--color-status-success)" /> Locker Facilities</li>
              </ul>
            </div>
            <button className="btn btn-primary" onClick={onNavigateToBook} style={{ marginTop: '1.5rem', width: '100%' }}>Join Monthly Pro</button>
          </div>

          <div className="card-elevated" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Monthly Reserved</h3>
              <div style={{ fontSize: '2rem', fontWeight: 700, margin: '0.75rem 0', color: 'var(--color-text-primary)' }}>₹6,999 <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 400 }}>/ 30 days</span></div>
              <ul style={{ listStyle: 'none', fontSize: '0.85rem', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <li style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}><CheckCircle2 size={16} color="var(--color-status-success)" /> Dedicated Fixed Desk</li>
                <li style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}><CheckCircle2 size={16} color="var(--color-status-success)" /> Permanent Seat Lock</li>
                <li style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}><CheckCircle2 size={16} color="var(--color-status-success)" /> Personal Storage Key</li>
              </ul>
            </div>
            <button className="btn btn-secondary" onClick={onNavigateToBook} style={{ marginTop: '1.5rem', width: '100%' }}>Reserve Fixed Desk</button>
          </div>
        </div>
      </section>

      {/* --- STUDYFLOW ENGINE SECTION --- */}
      <section className="card-spatial-dark" style={{ margin: '2rem 0', textAlign: 'center' }}>
        <div className="card-spatial-texture" />
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <span className="badge badge-warning" style={{ background: 'rgba(217, 119, 6, 0.2)', color: '#fcd34d', border: '1px solid rgba(217, 119, 6, 0.4)' }}>
            Fair Space Management
          </span>
          <h2 style={{ fontFamily: 'var(--font-family-display)', fontSize: '2.25rem', fontWeight: 700, margin: '1rem 0' }}>The StudyFlow Engine</h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Eliminating unused seat hoarding. A 15-minute grace period automatically liberates unattended desks and offers them to waitlisted members instantly.
          </p>
        </div>
      </section>

      {/* --- FAQ & CONTACT SECTION --- */}
      <section id="faq" className="section-faq-wrapper">
        <h2 style={{ fontFamily: 'var(--font-family-display)', fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>Frequently Asked Questions</h2>
        <div style={{ maxWidth: '750px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="card-elevated" style={{ cursor: 'pointer' }} onClick={() => setActiveFaq(activeFaq === 1 ? null : 1)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
              <span>How does desk booking work?</span>
              <HelpCircle size={18} color="var(--color-accent-primary)" />
            </div>
            {activeFaq === 1 && (
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.75rem' }}>
                Active members select a date, time slot, and preferred desk on our interactive floor map. Upon confirmation, a dynamic check-in QR code is generated.
              </p>
            )}
          </div>

          <div className="card-elevated" style={{ cursor: 'pointer' }} onClick={() => setActiveFaq(activeFaq === 2 ? null : 2)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
              <span>What if I am running late for my booking?</span>
              <HelpCircle size={18} color="var(--color-accent-primary)" />
            </div>
            {activeFaq === 2 && (
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.75rem' }}>
                A 15-minute grace period is provided. If you do not scan your check-in QR code within 15 minutes of slot commencement, the StudyFlow system releases the seat to waitlisted members.
              </p>
            )}
          </div>
        </div>
      </section>

      <footer id="contact" style={{ borderTop: '1px solid var(--color-border-subtle)', padding: '2.5rem 0', textAlign: 'center', fontSize: '0.85rem', color: '#94a3b8', background: 'linear-gradient(180deg, #faf8f5 0%, #0f172a 100%)', margin: '0 -1.5rem -1.5rem -1.5rem' }}>
        <p>© 2026 StudySpace Club. All rights reserved. Stage 02 Visual Design Prototype.</p>
      </footer>
    </div>
  );
}


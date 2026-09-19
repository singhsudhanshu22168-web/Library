import React from 'react';
import { BookOpen, User } from 'lucide-react';

export default function Navbar({ currentPortal, setPortal }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="#" className="brand-logo" onClick={() => setPortal('public')}>
          <div className="brand-icon-box">
            <BookOpen size={18} />
          </div>
          <span>StudySpace <span style={{ color: 'var(--color-accent-primary)', fontWeight: 400 }}>Club</span></span>
        </a>

        {/* CUSTOMER NAV LINKS */}
        <div className="nav-links">
          <a href="#space" className="nav-link">The Space</a>
          <a href="#how-it-works" className="nav-link">How It Works</a>
          <a href="#plans" className="nav-link">Membership</a>
          <a href="#faq" className="nav-link">FAQ</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setPortal('student')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <User size={14} /> Member Login
          </button>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => setPortal('student')}
          >
            Book a Desk
          </button>
        </div>
      </div>
    </nav>
  );
}

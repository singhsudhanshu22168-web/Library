import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PublicHomepage from './components/PublicHomepage';
import StudentPortal from './components/StudentPortal';
import AdminPortal from './components/AdminPortal';
import StaffPortal from './components/StaffPortal';

export default function App() {
  const [currentPortal, setPortal] = useState('public');

  return (
    <div>
      <Navbar currentPortal={currentPortal} setPortal={setPortal} />

      <main className="app-container">
        {currentPortal === 'public' && (
          <PublicHomepage onNavigateToBook={() => setPortal('student')} />
        )}

        {currentPortal === 'student' && (
          <StudentPortal />
        )}

        {currentPortal === 'admin' && (
          <AdminPortal />
        )}

        {currentPortal === 'staff' && (
          <StaffPortal />
        )}
      </main>
    </div>
  );
}

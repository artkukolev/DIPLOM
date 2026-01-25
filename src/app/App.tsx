import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<div style={{ padding: 24 }}>Login page (React+TS+Effector)</div>} />
      <Route path="*" element={<div style={{ padding: 24 }}>Not found</div>} />
    </Routes>
  );
}


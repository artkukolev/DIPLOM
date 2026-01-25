import React from 'react';
import { useUnit } from 'effector-react';
import { Navigate } from 'react-router-dom';
import { $isAuthenticated } from '../model/auth';

export function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const isAuthenticated = useUnit($isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}


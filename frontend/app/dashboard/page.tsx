"use client";

import { useAuth } from '../../store/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import RoleDashboard from '../../components/RoleDashboard';

export default function DashboardPage() {
  const user = useAuth((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return <RoleDashboard user={user} />;
}

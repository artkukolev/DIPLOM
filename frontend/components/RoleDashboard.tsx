import { User } from '../store/useAuth';
import DirectorDashboard from './dashboards/DirectorDashboard';
import AdminDashboard from './dashboards/AdminDashboard';
import StudentDashboard from './dashboards/StudentDashboard';
import ParentDashboard from './dashboards/ParentDashboard';

interface Props { user: User }

export default function RoleDashboard({ user }: Props) {
  switch (user.role) {
    case 'director':
      return <DirectorDashboard user={user} />;
    case 'admin':
      return <AdminDashboard user={user} />;
    case 'student':
      return <StudentDashboard user={user} />;
    case 'parent':
      return <ParentDashboard user={user} />;
    default:
      return <div>Unknown role</div>;
  }
}

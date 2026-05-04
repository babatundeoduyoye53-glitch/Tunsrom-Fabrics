import { Navigate } from 'react-router-dom';
import { isAdminAuthenticated } from '../../api/adminAuth';

function ProtectedRoute({ children }) {
  const loggedIn = isAdminAuthenticated();

  if (!loggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedRoute;

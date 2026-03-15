import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';
import toast from 'react-hot-toast';

/**
 * ProtectedRoute — guards routes behind authentication & optional role checks.
 *
 * Props:
 *   requiredRole — if set, user must have this role (e.g. 'admin')
 *   children     — the component to render when authorized
 */
export default function ProtectedRoute({ children, requiredRole }) {
    const { user, loading } = useAuth();

    if (loading) return <LoadingSpinner />;

    // Not logged in → redirect to login
    if (!user) return <Navigate to="/admin/login" replace />;

    // Logged in but wrong role → redirect home with a toast
    if (requiredRole && user.role !== requiredRole) {
        toast.error('You do not have permission to access that page');
        return <Navigate to="/" replace />;
    }

    return children;
}

import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children, isAdmin, roles }) {
    const location = useLocation();

    const { authenticated, user: loggedUser } = useSelector((state) => state.user);

    if (authenticated === true && !loggedUser.isPhoneVerified) {
        return <Navigate to="/verify-phone" state={{ from: location }} replace />;
    }
    if (authenticated === true && !loggedUser.isEmailVerified) {
        return <Navigate to="/verify-email" state={{ from: location }} replace />;
    }

    if (authenticated === false) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (authenticated === true && isAdmin === true && !roles.includes(loggedUser?.role)) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

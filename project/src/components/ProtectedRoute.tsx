import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireRole?: 'client' | 'therapist' | 'admin';
  requireVerification?: boolean;
}

export function ProtectedRoute({ 
  children, 
  requireRole, 
  requireVerification = false 
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireRole && user.role !== requireRole) {
    // Redirect to appropriate dashboard based on user role
    const redirectPath = user.role === 'admin'
      ? '/super-admin'
      : user.role === 'therapist' 
      ? '/therapist-dashboard' 
      : '/profile';
    return <Navigate to={redirectPath} replace />;
  }

  if (requireVerification && user.role === 'therapist' && !user.verified) {
    return <Navigate to="/therapist-verification-pending" replace />;
  }

  return <>{children}</>;
}
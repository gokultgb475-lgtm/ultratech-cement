import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0C0F] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#FF4D2E]/20 border-t-[#FF4D2E] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#A6AAB6]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { PracticeAI } from './pages/PracticeAI';
import { BookTherapist } from './pages/BookTherapist';
import { TalkPlatform } from './pages/TalkPlatform';
import { Conference } from './pages/Conference';
import { Resources } from './pages/Resources';
import { Profile } from './pages/Profile';
import { TherapistProfile } from './pages/TherapistProfile';
import { TherapistDashboard } from './pages/TherapistDashboard';
import { TherapistSignup } from './pages/TherapistSignup';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { TherapistVerificationPending } from './pages/TherapistVerificationPending';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/therapist-signup" element={<TherapistSignup />} />
              <Route path="/therapist-verification-pending" element={<TherapistVerificationPending />} />
              
              {/* Routes with header/footer */}
              <Route path="/*" element={
                <>
                  <Header />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/conference" element={<Conference />} />
                      <Route path="/resources" element={<Resources />} />
                      
                      {/* Protected routes for authenticated users */}
                      <Route path="/practice" element={
                        <ProtectedRoute>
                          <PracticeAI />
                        </ProtectedRoute>
                      } />
                      <Route path="/therapist" element={
                        <ProtectedRoute>
                          <BookTherapist />
                        </ProtectedRoute>
                      } />
                      <Route path="/talks" element={
                        <ProtectedRoute>
                          <TalkPlatform />
                        </ProtectedRoute>
                      } />
                      <Route path="/profile" element={
                        <ProtectedRoute requireRole="client">
                          <Profile />
                        </ProtectedRoute>
                      } />
                      
                      {/* Therapist-only routes */}
                      <Route path="/therapist-dashboard" element={
                        <ProtectedRoute requireRole="therapist" requireVerification={true}>
                          <TherapistDashboard />
                        </ProtectedRoute>
                      } />
                    </Routes>
                  </main>
                  <Footer />
                </>
              } />
            </Routes>
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
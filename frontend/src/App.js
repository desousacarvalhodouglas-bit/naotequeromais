import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import NewHome from './pages/NewHome';
import Home from './pages/Home';
import Empregos from './pages/Empregos';
import Mapa from './pages/Mapa';
import Mensagens from './pages/Mensagens';
import Perfil from './pages/Perfil';
import { Toaster } from './components/ui/toaster';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? <Navigate to="/feed" replace /> : children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute><NewHome /></PublicRoute>} />
      <Route path="/feed" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/empregos" element={<ProtectedRoute><Empregos /></ProtectedRoute>} />
      <Route path="/mapa" element={<ProtectedRoute><Mapa /></ProtectedRoute>} />
      <Route path="/mensagens" element={<ProtectedRoute><Mensagens /></ProtectedRoute>} />
      <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
      <Route path="/abonamento" element={<ProtectedRoute><div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-500">Página Assinatura em construção</p></div></ProtectedRoute>} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

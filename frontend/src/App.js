import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import NewHome from './pages/NewHome';
import Home from './pages/Home';
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
      <Route path="/empregos" element={<ProtectedRoute><div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-500">Página Empregos em construção</p></div></ProtectedRoute>} />
      <Route path="/mapa" element={<ProtectedRoute><div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-500">Página Mapa em construção</p></div></ProtectedRoute>} />
      <Route path="/mensagens" element={<ProtectedRoute><div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-500">Página Mensagens em construção</p></div></ProtectedRoute>} />
      <Route path="/perfil" element={<ProtectedRoute><div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-500">Página Perfil em construção</p></div></ProtectedRoute>} />
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

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import NewHome from './pages/NewHome';
import Home from './pages/Home';
import Empregos from './pages/Empregos';
import Mapa from './pages/Mapa';
import Mensagens from './pages/Mensagens';
import Perfil from './pages/Perfil';
import Abonamento from './pages/Abonamento';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
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
      <Route path="/abonamento" element={<ProtectedRoute><Abonamento /></ProtectedRoute>} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="demandas" element={<div className="p-6"><h2 className="text-2xl font-bold">Demandas</h2><p className="text-gray-600 mt-2">Gerencie suas demandas aqui</p></div>} />
        <Route path="perimetro" element={<div className="p-6"><h2 className="text-2xl font-bold">Perímetro</h2><p className="text-gray-600 mt-2">Configure seu perímetro de atendimento</p></div>} />
        <Route path="perfil" element={<div className="p-6"><h2 className="text-2xl font-bold">Meu Perfil</h2><p className="text-gray-600 mt-2">Visualize seu perfil público</p></div>} />
        <Route path="editar-perfil" element={<div className="p-6"><h2 className="text-2xl font-bold">Editar Perfil</h2><p className="text-gray-600 mt-2">Modifique suas informações</p></div>} />
        <Route path="avaliacoes" element={<div className="p-6"><h2 className="text-2xl font-bold">Avaliações</h2><p className="text-gray-600 mt-2">Gerencie seus comentários e avaliações</p></div>} />
        <Route path="orcamentos" element={<div className="p-6"><h2 className="text-2xl font-bold">Orçamentos</h2><p className="text-gray-600 mt-2">Crie e gerencie orçamentos</p></div>} />
        <Route path="faturas" element={<div className="p-6"><h2 className="text-2xl font-bold">Faturas</h2><p className="text-gray-600 mt-2">Gerencie suas faturas</p></div>} />
        <Route path="clientes" element={<div className="p-6"><h2 className="text-2xl font-bold">Clientes</h2><p className="text-gray-600 mt-2">Diretório de clientes</p></div>} />
      </Route>
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

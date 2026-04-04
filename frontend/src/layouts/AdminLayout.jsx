import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import { Card } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';
import { 
  FileText, Settings, BarChart3, Users, Package, 
  CreditCard, Receipt, Video, Star, Globe, Edit,
  ChevronRight, Eye, MapPin, TrendingUp
} from 'lucide-react';

const ADMIN_EMAIL = 'mecjohnson97@gmail.com';

const menuSections = [
  {
    title: 'Meu Perímetro de Intervenção',
    items: [
      { path: '/admin/demandas', label: 'Ver as demandas', icon: Eye },
      { path: '/admin/perimetro', label: 'Gerenciar meu perímetro', icon: MapPin }
    ]
  },
  {
    title: 'Minha Visibilidade',
    items: [
      { path: '/admin/perfil', label: 'Ver minha página perfil', icon: Eye },
      { path: '/admin/editar-perfil', label: 'Modificar minha página perfil', icon: Edit },
      { path: '/admin/avaliacoes', label: 'Gerenciar meus comentários', icon: Star },
      { path: '/admin/seo', label: 'Meu referenciamento Google', icon: Globe },
      { path: '/admin/comunicacao', label: 'Meus suportes de comunicação', icon: TrendingUp }
    ]
  },
  {
    title: 'Minha Empresa',
    badge: 'PRO',
    items: [
      { path: '/admin/dashboard', label: 'Painel de controle', icon: BarChart3 },
      { path: '/admin/orcamentos', label: 'Orçamentos', icon: FileText },
      { path: '/admin/faturas', label: 'Faturas', icon: Receipt },
      { path: '/admin/recebimentos', label: 'Recebimentos', icon: CreditCard },
      { path: '/admin/clientes', label: 'Diretório de clientes', icon: Users },
      { path: '/admin/catalogo', label: 'Catálogo de artigos', icon: Package },
      { path: '/admin/parametros', label: 'Parâmetros', icon: Settings },
      { path: '/admin/tutoriais', label: 'Tutoriais em vídeo', icon: Video }
    ]
  }
];

const AdminLayout = () => {
  const location = useLocation();
  const { user, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Check if user is admin
  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Acesso Restrito</h1>
            <p className="text-gray-600 mb-6">
              Você não tem permissão para acessar o painel administrativo.
            </p>
            <Link 
              to="/feed" 
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Voltar ao Feed
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-3 py-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-green-800">
            ✓ <strong>Admin:</strong> {user.email}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-3 sticky top-20">
              <div className="space-y-4">
                {menuSections.map((section, idx) => (
                  <div key={idx}>
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-sm font-bold text-gray-900">{section.title}</h3>
                      {section.badge && (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-semibold">
                          {section.badge}
                        </span>
                      )}
                    </div>
                    <div className="space-y-1">
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                              isActive
                                ? 'bg-green-50 text-green-700 font-semibold'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <Icon className="w-4 h-4" />
                              <span className="text-xs">{item.label}</span>
                            </div>
                            <ChevronRight className="w-3 h-3" />
                          </Link>
                        );
                      })}
                    </div>
                    {idx < menuSections.length - 1 && (
                      <div className="border-t border-gray-200 mt-3 pt-3" />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
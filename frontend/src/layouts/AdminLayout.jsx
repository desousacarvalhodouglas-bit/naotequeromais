import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { Card } from '../components/ui/card';
import { 
  FileText, Settings, BarChart3, Users, Package, 
  CreditCard, Receipt, Video, Star, Globe, Edit,
  ChevronRight, Eye, MapPin, TrendingUp
} from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-3 py-4">
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